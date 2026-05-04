import { sendToContentJS } from '@/helpers/messager'
import { pinger } from '@/helpers/pinger'
import { Box, Dialog, Stack } from '@mui/material'
import PlayButton from './components/PlayButton'
import TableFieldUI from './interfaces/GreenUI'
import TablePanel from './interfaces/PurpleUI'

function App() {
   const [isDialogOpen, setDialogOpen] = useState(false)
   const [fieldUI, setField] = useState<FieldByte[]>([])

   async function handleClose() {
      const [tab] = await browser.tabs.query({
         active: true,
         currentWindow: false,
      })

      if (tab.id) {
         sendToContentJS(tab.id, { message: 'selection cancelled' })
      }

      setDialogOpen(false)
   }

   async function handlePlay() {
      const [tab] = await browser.tabs.query({
         active: true,
         currentWindow: false,
      })

      if (tab.id) {
         sendToContentJS(tab.id, { message: 'begin scrape', list: fieldUI })
      }
   }

   function handleFieldAdd(type: FieldTypes) {
      setField((old) => {
         const newField: FieldByte = {
            id: old.length,
            type: type,
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

      console.log(fieldUI)
   }

   function handleFieldDelete(id: number) {
      setField((old) => {
         const raw = old.filter((oldField) => oldField.id !== id)
         return raw.map((field, i) => ({ ...field, id: i }))
      })
   }

   useEffect(() => {
      pinger((msg) => {
         switch (msg.message) {
            case 'selection ongoing':
               setDialogOpen(true)
               break

            case 'selection done':
               setDialogOpen(false)
               break

            default:
               break
         }
      })
   }, [])

   return (
      <div>
         <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'center' }}
         >
            <TablePanel scale={0.9} />

            <Stack direction="column" sx={{ alignItems: 'center', gap: 0.8 }}>
               <TableFieldUI
                  fieldList={fieldUI}
                  fieldAdd={handleFieldAdd}
                  fieldUpdate={handleFieldUpdate}
                  fieldDelete={handleFieldDelete}
               />

               <PlayButton onClick={handlePlay} />
            </Stack>
         </Stack>

         <Dialog open={isDialogOpen} onClose={handleClose}>
            <Box>lol</Box>
         </Dialog>
      </div>
   )
}

export default App
