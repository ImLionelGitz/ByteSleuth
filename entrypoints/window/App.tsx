// import { sendToContentJS } from '@/helpers/messager'
// import { pinger } from '@/helpers/pinger'
import { Stack } from '@mui/material'
import TablePanel from './interfaces/TablePanel'
import FieldsPanel from './interfaces/FieldsPanel'
import ButtonPanel from './interfaces/ButtonPanel'

const TABLE_SIZE = 410

function App() {
   // const [isDialogOpen, setDialogOpen] = useState(false)
   // const [fieldUI, setField] = useState<FieldByte[]>([])

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

   // function handleFieldAdd(type: FieldTypes) {
   //    setField((old) => {
   //       const newField: FieldByte = {
   //          id: old.length,
   //          type: type,
   //          name: 'New Field',
   //          selector: '',
   //       }

   //       return [...old, newField]
   //    })
   // }

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
               <FieldsPanel />
               <ButtonPanel />
            </Stack>
         </Stack>
      </div>
   )
}

export default App
