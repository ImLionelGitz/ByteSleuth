// import { sendToContentJS } from '@/helpers/messager'
// import { pinger } from '@/helpers/pinger'
import { Dialog, Stack } from '@mui/material'
import ButtonPanel from './interfaces/ButtonPanel'
import CodeEditor from './interfaces/CodeEditor'
import FieldsPanel from './interfaces/FieldsPanel'
import TablePanel from './interfaces/TablePanel'
import InfoPanel from './interfaces/popups/InfoPanel'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'
import SettingsPanel from './interfaces/popups/SettingsPanel'
import reducer from '@/entrypoints/window/myReducer'
import { checkMemoryFull, getFields } from '@/helpers/datastores/fieldDatabase'

const TABLE_SIZE = 390

function App() {
   const [fields, dispatch] = useReducer(reducer, [])
   const [selecting, setSelecting] = useState(false)
   const [editorID, setEditorID] = useState(NaN)
   const [settingVisible, setSettingVisible] = useState(false)

   // async function handlePlay() {
   //    const [tab] = await browser.tabs.query({
   //       active: true,
   //       currentWindow: false,
   //    })

   //    if (tab.id) {
   //       sendToContentJS(tab.id, { message: 'begin scrape', list: fieldUI })
   //    }
   // }

   async function handleInfoClose() {
      const tabID = await getCurrentTabID()

      if (tabID) {
         sendToContentJS<string>(tabID, {
            message: 'selection cancelled',
         })
      }

      setSelecting(false)
   }

   async function handleFieldAdd() {
      const full = await checkMemoryFull()

      if (!full) {
         dispatch({
            type: 'ADD',
            payload: {
               id: fields.length,
               name: 'New Field',
               selector: '',
            },
         })
      }
   }

   function handleFieldUpdate(newField: FieldByte) {
      dispatch({ type: 'UPDATE', payload: newField })
   }

   function handleFieldDelete(id: number) {
      dispatch({ type: 'DELETE', payload: id })
   }

   function handleFieldReorder(newList: FieldByte[]) {
      dispatch({ type: 'LOAD', payload: newList })
   }

   useEffect(() => {
      const fetchList = async () => {
         const data = await getFields()
         dispatch({ type: 'LOAD', payload: data })
      }

      fetchList()
   }, [])

   return (
      <div>
         <Stack
            direction="row"
            sx={{
               height: '100vh',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '8px',
            }}
         >
            <TablePanel size={TABLE_SIZE} />

            <Stack sx={{ gap: '12px', height: TABLE_SIZE }}>
               <FieldsPanel
                  allFields={fields}
                  fieldAdd={handleFieldAdd}
                  fieldUpdate={handleFieldUpdate}
                  fieldDelete={handleFieldDelete}
                  fieldReorder={handleFieldReorder}
                  disableInteract={(status) => setSelecting(status)}
                  openEditor={(id) => setEditorID(id)}
               />

               <ButtonPanel
                  onPlay={() => {}}
                  onSetting={() => setSettingVisible(true)}
               />
            </Stack>
         </Stack>

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

         <Dialog open={selecting} onClose={handleInfoClose}>
            <InfoPanel
               title="Selecting"
               msg="Click outside to cancel"
               type={'INFO'}
            />
         </Dialog>
      </div>
   )
}

export default App
