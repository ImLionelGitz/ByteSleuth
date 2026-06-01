import { loadFields } from '@/helpers/datastores/fieldDatabase'
import {
   giveAllScripts,
   giveScript,
   saveScript,
} from '@/helpers/datastores/scriptDatabase'
import {
   checkStandard,
   isCodeDefault,
   minifyCode,
   unminifyCode,
} from '@/helpers/formatter'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'
import { Dialog, Modal } from '@mui/material'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary'
import CodeEditor from './interfaces/CodeEditor'
import MainScreen from './interfaces/MainScreen'
import InfoPanel, { type Panel } from './interfaces/popups/InfoPanel'
import SettingsPanel from './interfaces/popups/SettingsPanel'
import fieldReducer from './reducers/fieldReducer'

function App() {
   const [fieldID, setFieldID] = useState(NaN)
   const [curLinkeds, setCurLinked] = useState<number[]>([])
   const [curCode, setCurCode] = useState<string | undefined>(undefined)

   const curLinkedCache = useRef(curLinkeds)
   const curCodeDraft = useRef('')

   const [fields, fieldUpdater] = useReducer(fieldReducer, [])
   const scripts = useLiveQuery(() => giveAllScripts(), [fieldID])

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

   const handleCodeWrite = (code: string | undefined) => {
      if (code === undefined) return
      curCodeDraft.current = code
   }

   const handleCodeLink = (id: number, checked: boolean) => {
      if (!scripts) return

      if (checked && !curLinkeds.includes(id)) {
         const already = scripts.some(
            (script) => script.linkedIDs.includes(id) && script.id !== fieldID
         )

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

   const handleEditorClose = async () => {
      const noEmptyCode =
         curCodeDraft.current && curCodeDraft.current !== curCode

      const unChangedLinks =
         curLinkeds.length === curLinkedCache.current.length &&
         curLinkeds.every((id) => curLinkedCache.current.includes(id))

      const proceed = async (discard: boolean = false) => {
         if (
            !discard &&
            curCode !== undefined &&
            (noEmptyCode || !unChangedLinks)
         ) {
            const minified = await minifyCode(curCodeDraft.current || curCode)

            await saveScript({
               id: fieldID,
               linkedIDs: curLinkeds,
               code: minified,
            })
         }

         setFieldID(NaN)
         setCurLinked([])
         setCurCode(undefined)
         curCodeDraft.current = ''
         curLinkedCache.current = []
      }

      try {
         const looksDefault = await isCodeDefault(curCodeDraft.current, fieldID)

         if (curCodeDraft.current && looksDefault) {
            setDialogState({
               title: 'Code Not Changed',
               msg: 'Your code was not changed! It would be discarded if you choose to proceed.',
               type: 'WARNING',
               onConfirm() {
                  proceed(true)
                  setDialogState(null)
               },
            })

            return
         }

         const isFormatted = await checkStandard(curCodeDraft.current)

         if (!isFormatted) {
            console.log(isFormatted, curCodeDraft.current)
            setDialogState({
               title: 'Format Issue Detected',
               msg: 'Your code appears to not follow our format! It may be formatted accordingly if you choose to proceed.',
               type: 'WARNING',
               onConfirm() {
                  proceed()
                  setDialogState(null)
               },
            })

            return
         }

         proceed()
         console.log(curLinkeds)
      } catch {
         setDialogState({
            title: 'Code Contains JS Breaking Syntax',
            msg: 'Your code appears to not follow javascript standards! It may be discarded if you choose to proceed.',
            type: 'WARNING',
            onConfirm() {
               proceed(true)
               setDialogState(null)
            },
         })
      }
   }

   useEffect(() => {
      const fetchScript = async () => {
         if (!Number.isNaN(fieldID) && scripts) {
            const curScript = await giveScript(fieldID)
            const code = await unminifyCode(curScript?.code || '')
            const linked = curScript?.linkedIDs || [fieldID]

            setCurLinked(linked)
            setCurCode(code)

            curLinkedCache.current = linked
         }
      }

      fetchScript()
   }, [fieldID])

   useEffect(() => {
      const fetchFields = async () => {
         const fieldData = await loadFields()
         fieldUpdater({ type: 'LOAD', payload: fieldData })
      }

      fetchFields()
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
      const handleExtensionMessage = (msg: BGMessages) => {
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
            allFields={fields ?? []}
            allScripts={scripts ?? []}
            updater={fieldUpdater}
            openEditor={setFieldID}
            showDialog={setDialogState}
            openSettings={() => setSettingVisible(true)}
         />

         <Dialog open={settingVisible} onClose={() => setSettingVisible(false)}>
            <SettingsPanel openEditor={setFieldID} fields={fields} />
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
               id={fieldID}
               linkedIDs={curLinkeds}
               code={curCode}
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
