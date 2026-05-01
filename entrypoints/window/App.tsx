import { Box, Dialog, Stack } from '@mui/material'
import TableFieldUI from './interfaces/GreenUI'
import TablePanel from './interfaces/PurpleUI'
import { pinger } from '@/helpers/pinger'

function App() {
   const [isDialogOpen, setDialogOpen] = useState(false)

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

         <Dialog open={isDialogOpen}>
            <Box>lol</Box>
         </Dialog>
      </div>
   )
}

export default App
