// import { sendToContentJS } from '@/helpers/messager'
// import { pinger } from '@/helpers/pinger'
import { Dialog, Stack } from '@mui/material'
import ButtonPanel from './interfaces/ButtonPanel'
import CodeEditor from './interfaces/CodeEditor'
import FieldsPanel from './interfaces/FieldsPanel'
import TablePanel from './interfaces/TablePanel'
import InfoPanel from './interfaces/popups/InfoPanel'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'

const TABLE_SIZE = 390

function App() {
   const [fields, setField] = useState<FieldByte[]>([])
   const [selecting, setSelecting] = useState(false)

   // async function handlePlay() {
   //    const [tab] = await browser.tabs.query({
   //       active: true,
   //       currentWindow: false,
   //    })

   //    if (tab.id) {
   //       sendToContentJS(tab.id, { message: 'begin scrape', list: fieldUI })
   //    }
   // }

   async function handleClose() {
      const tabID = await getCurrentTabID()

      if (tabID) {
         sendToContentJS<string>(tabID, {
            message: 'selection cancelled',
         })
      }

      setSelecting(false)
   }

   function handleFieldAdd() {
      setField((old) => {
         const newField: FieldByte = {
            id: old.length,
            name: 'New Field',
            selector: '',
         }

         return [...old, newField]
      })
   }

   function handleFieldUpdate(newField: FieldByte) {
      setField((old) =>
         old.map((oldField) => {
            if (oldField.id === newField.id) {
               return newField
            }

            return oldField
         })
      )
   }

   function handleFieldDelete(id: number) {
      setField((old) => {
         const raw = old.filter((oldField) => oldField.id !== id)
         return raw.map((field, i) => ({ ...field, id: i }))
      })
   }

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
                  fieldReorder={(n) => setField(n)}
                  disableInteract={(status) => setSelecting(status)}
               />
               <ButtonPanel />
            </Stack>
         </Stack>

         <Dialog
            open={false}
            slotProps={{
               paper: { sx: { backgroundColor: 'transparent' } },
            }}
         >
            <CodeEditor />
         </Dialog>

         <Dialog open={selecting} onClose={handleClose}>
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
