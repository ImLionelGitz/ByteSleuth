import { getFields } from '@/helpers/datastores/fieldDatabase'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'
import { Dialog } from '@mui/material'
import { useEffect, useMemo, useReducer, useState } from 'react'
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

   const curScript = useMemo(() => {
      if (Number.isNaN(fieldID)) return null

      return scripts.find((f) => f.linkedIDs.includes(fieldID)) || null
   }, [scripts, fieldID])

   const [settingVisible, setSettingVisible] = useState(false)
   const [dialogState, setDialogState] = useState<Panel | null>(null)

   async function handleInfoClose() {
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

   const handleCodeWrite = (code: string | undefined) => {
      if (code === undefined) return

      if (curScript)
         scriptAction({
            type: 'UPDATE',
            id: fieldID,
            payload: { ...curScript, code: code },
         })
      else
         scriptAction({
            type: 'ADD',
            payload: { linkedIDs: [fieldID], code: code },
         })
   }

   const handleCodeLink = (id: number, checked: boolean) => {
      if (curScript) {
         const nextIDs = checked
            ? [...curScript.linkedIDs, id]
            : curScript.linkedIDs.filter((linkedId) => linkedId !== id)

         scriptAction({
            type: 'UPDATE',
            id: fieldID,
            payload: { ...curScript, linkedIDs: nextIDs },
         })
      } else if (checked) {
         scriptAction({
            type: 'ADD',
            payload: {
               linkedIDs: id === fieldID ? [fieldID] : [fieldID, id],
               code: '',
            },
         })
      }
   }

   function displayNormalDialog(show: boolean) {
      if (show) {
         setDialogState({
            title: 'Selecting',
            msg: 'Click anywhere outside of this dialog within the window to exit',
            type: 'INFO',
         })
      } else setDialogState(null)
   }

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

         <Dialog
            open={!Number.isNaN(fieldID)}
            onClose={() => setFieldID(NaN)}
            slotProps={{
               paper: { sx: { backgroundColor: 'transparent' } },
            }}
         >
            <CodeEditor
               fields={fields}
               curEditingId={fieldID}
               curScript={curScript}
               onCodeWrite={handleCodeWrite}
               onFieldLink={handleCodeLink}
            />
         </Dialog>

         <Dialog open={dialogState !== null} onClose={handleInfoClose}>
            {dialogState && (
               <InfoPanel
                  title={dialogState.title}
                  msg={dialogState.msg}
                  type={dialogState.type}
               />
            )}
         </Dialog>
      </GlobalErrorBoundary>
   )
}

export default App
