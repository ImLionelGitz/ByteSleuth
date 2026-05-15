// import { sendToContentJS } from '@/helpers/messager'
// import { pinger } from '@/helpers/pinger'
import { Dialog, Stack } from '@mui/material'
import ButtonPanel from './interfaces/ButtonPanel'
import CodeEditor from './interfaces/CodeEditor'
import FieldsPanel from './interfaces/FieldsPanel'
import TablePanel from './interfaces/TablePanel'

const TABLE_SIZE = 390

function App() {
   // const [isDialogOpen, setDialogOpen] = useState(false)
   const [fields, setField] = useState<FieldByte[]>([])

   // async function handleClose() {
   //    const [tab] = await browser.tabs.query({
   //       active: true,
   //       currentWindow: false,
   //    })

   //    if (tab.id) {
   //       sendToContentJS(tab.id, { message: 'selection cancelled' })
   //    }

   //    setDialogOpen(false)
   // }

   // async function handlePlay() {
   //    const [tab] = await browser.tabs.query({
   //       active: true,
   //       currentWindow: false,
   //    })

   //    if (tab.id) {
   //       sendToContentJS(tab.id, { message: 'begin scrape', list: fieldUI })
   //    }
   // }

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

   // function handleFieldUpdate(newField: FieldByte) {
   //    setField((old) =>
   //       old.map((oldField) => {
   //          if (oldField.id === newField.id) {
   //             return newField
   //          }

   //          return oldField
   //       })
   //    )

   //    console.log(fieldUI)
   // }

   // function handleFieldDelete(id: number) {
   //    setField((old) => {
   //       const raw = old.filter((oldField) => oldField.id !== id)
   //       return raw.map((field, i) => ({ ...field, id: i }))
   //    })
   // }

   // useEffect(() => {
   //    pinger((msg) => {
   //       switch (msg.message) {
   //          case 'selection ongoing':
   //             setDialogOpen(true)
   //             break

   //          case 'selection done':
   //             setDialogOpen(false)
   //             break

   //          default:
   //             break
   //       }
   //    })
   // }, [])

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
               <FieldsPanel allFields={fields} fieldAdd={handleFieldAdd} />
               <ButtonPanel />
            </Stack>
         </Stack>

         <Dialog
            open
            slotProps={{
               paper: { sx: { backgroundColor: 'transparent' } },
            }}
         >
            <CodeEditor />
         </Dialog>
      </div>
   )
}

export default App
