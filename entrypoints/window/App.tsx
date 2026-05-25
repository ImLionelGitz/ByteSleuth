import { getFields } from '@/helpers/datastores/fieldDatabase'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'
import { Dialog, Modal } from '@mui/material'
import { useEffect, useReducer, useState } from 'react'
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary'
import CodeEditor from './interfaces/CodeEditor'
import MainScreen from './interfaces/MainScreen'
import InfoPanel, { type Panel } from './interfaces/popups/InfoPanel'
import SettingsPanel from './interfaces/popups/SettingsPanel'
import fieldReducer from './reducers/fieldReducer'
import scriptReducer from './reducers/scriptReducer'

function App() {
   const [fields, fieldAction] = useReducer(fieldReducer, [])
   const [scripts, scriptAction] = useReducer(scriptReducer, [])

   const [fieldID, setFieldID] = useState(NaN)

   const [curLinkeds, setCurLinked] = useState<number[]>([])
   const curCodeDraft = useRef('')

   const [settingVisible, setSettingVisible] = useState(false)
   const [dialogState, setDialogState] = useState<Panel | null>(null)

   const handleInfoClose = async () => {
      if (dialogState?.type == 'INFO') {
         const tabID = await getCurrentTabID()

         if (tabID) {
            sendToContentJS<string>(tabID, {
               message: 'selection cancelled',
            })
         }
      }

      setDialogState(null)
   }

   const displayNormalDialog = (show: boolean) => {
      if (show) {
         setDialogState({
            title: 'Selecting',
            msg: 'Click anywhere outside of this dialog within the window to exit',
            type: 'INFO',
         })
      } else setDialogState(null)
   }

   const handleCodeWrite = (code: string | undefined) => {
      if (code === undefined) return
      curCodeDraft.current = code
   }

   const handleCodeLink = (id: number, checked: boolean) => {
      if (checked && !curLinkeds.includes(id)) {
         const already = scripts.some((script) => script.linkedIDs.includes(id))

         if (already) return

         setCurLinked([...curLinkeds, id])
      } else if (!checked) {
         if (curLinkeds.length === 1) {
            setDialogState({
               title: 'Warning',
               msg: 'Unlinking the last field will delete the associated script. Do you want to proceed?',
               type: 'WARNING',
               onConfirm: () => {
                  setCurLinked(curLinkeds.filter((linkedId) => linkedId !== id))
                  setDialogState(null)
               },
            })
         } else setCurLinked(curLinkeds.filter((linkedId) => linkedId !== id))
      }
   }

   const handleEditorClose = () => {
      scriptAction({
         type: 'SAVE',
         id: fieldID,
         payload: { linkedIDs: curLinkeds, code: curCodeDraft.current },
      })

      setFieldID(NaN)
      setCurLinked([])
      curCodeDraft.current = ''
   }

   useEffect(() => {
      if (!Number.isNaN(fieldID)) {
         const curScript = scripts.find((script) =>
            script.linkedIDs.includes(fieldID)
         )

         setCurLinked(curScript?.linkedIDs || [fieldID])
         curCodeDraft.current = curScript?.code || ''
      }
   }, [fieldID])

   useEffect(() => {
      const fetchList = async () => {
         const data = await getFields()
         fieldAction({ type: 'LOAD', payload: data })
      }

      fetchList()
   }, [])

   // Error handlers (central)
   useEffect(() => {
      const handleWindowError = (event: ErrorEvent) => {
         setDialogState({
            title: 'An Error Occurred',
            msg: event.message,
            type: 'ERROR',
         })
      }

      const handleRejection = (event: PromiseRejectionEvent) => {
         setDialogState({
            title: 'An Async Error Occurred',
            msg: event.reason?.message || String(event.reason),
            type: 'ERROR',
         })
      }

      // 2. Catch errors sent from Background or Content scripts via WXT/WebExtension API
      const handleExtensionMessage = (msg: Messages) => {
         if (msg.message === 'error occured') {
            setDialogState({
               title: 'An External Error Occurred',
               msg: msg.err,
               type: 'ERROR',
            })
         }
      }

      window.addEventListener('error', handleWindowError)
      window.addEventListener('unhandledrejection', handleRejection)
      browser.runtime.onMessage.addListener(handleExtensionMessage)

      return () => {
         window.removeEventListener('error', handleWindowError)
         window.removeEventListener('unhandledrejection', handleRejection)
         browser.runtime.onMessage.removeListener(handleExtensionMessage)
      }
   }, [])

   return (
      <GlobalErrorBoundary>
         <MainScreen
            allFields={fields}
            allScripts={scripts}
            updater={fieldAction}
            openEditor={setFieldID}
            showDialog={displayNormalDialog}
            openSettings={() => setSettingVisible(true)}
         />

         <Dialog open={settingVisible} onClose={() => setSettingVisible(false)}>
            <SettingsPanel openEditor={() => setFieldID(Math.PI)} />
         </Dialog>

         <Modal
            open={!Number.isNaN(fieldID)}
            onClose={handleEditorClose}
            sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <CodeEditor
               fields={fields}
               curEditingId={fieldID}
               linkedIDs={curLinkeds}
               code={curCodeDraft.current}
               onCodeWrite={handleCodeWrite}
               onFieldLink={handleCodeLink}
            />
         </Modal>

         <Dialog open={dialogState !== null} onClose={handleInfoClose}>
            {dialogState && (
               <InfoPanel
                  title={dialogState.title}
                  msg={dialogState.msg}
                  type={dialogState.type}
                  onConfirm={dialogState.onConfirm}
               />
            )}
         </Dialog>
      </GlobalErrorBoundary>
   )
}

export default App
