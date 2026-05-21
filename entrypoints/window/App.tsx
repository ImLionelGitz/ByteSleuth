// import { sendToContentJS } from '@/helpers/messager'
// import { pinger } from '@/helpers/pinger'
import reducer from '@/entrypoints/window/reducers/fieldReducer'
import { getFields } from '@/helpers/datastores/fieldDatabase'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'
import { Dialog } from '@mui/material'
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary'
import CodeEditor from './interfaces/CodeEditor'
import MainScreen from './interfaces/MainScreen'
import InfoPanel, { type Panel } from './interfaces/popups/InfoPanel'
import SettingsPanel from './interfaces/popups/SettingsPanel'

function App() {
   const [fields, dispatch] = useReducer(reducer, [])
   const [editorID, setEditorID] = useState(NaN)
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

   useEffect(() => {
      const fetchList = async () => {
         const data = await getFields()
         dispatch({ type: 'LOAD', payload: data })
      }

      fetchList()
   }, [])

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
            updater={dispatch}
            openEditor={setEditorID}
            showDialog={(show) => {
               if (show) {
                  setDialogState({
                     title: 'Selecting',
                     msg: 'Click anywhere outside of this dialog within the window to exit',
                     type: 'INFO',
                  })
               } else setDialogState(null)
            }}
            openSettings={() => setSettingVisible(true)}
         />

         <Dialog open={settingVisible} onClose={() => setSettingVisible(false)}>
            <SettingsPanel openEditor={() => setEditorID(Math.PI)} />
         </Dialog>

         <Dialog
            open={!Number.isNaN(editorID)}
            onClose={() => setEditorID(NaN)}
            slotProps={{
               paper: { sx: { backgroundColor: 'transparent' } },
            }}
         >
            <CodeEditor />
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
