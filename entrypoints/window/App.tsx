import { Box, Dialog, Stack } from '@mui/material'
import TableFieldUI from './interfaces/GreenUI'
import TablePanel from './interfaces/PurpleUI'
import { pinger } from '@/helpers/pinger'
import { sendToContentJS } from '@/helpers/messager'

function App() {
   const [isDialogOpen, setDialogOpen] = useState(false)

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
            <TableFieldUI />
         </Stack>

         <Dialog open={isDialogOpen} onClose={handleClose}>
            <Box>lol</Box>
         </Dialog>
      </div>
   )
}

export default App
