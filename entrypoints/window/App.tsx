import { Stack } from '@mui/material'
import TableFieldUI from './interfaces/GreenUI'
import TablePanel from './interfaces/PurpleUI'

function App() {
   return (
      <div>
         <Stack>
            <TablePanel scale={0.9} />
            <TableFieldUI />
         </Stack>
      </div>
   )
}

export default App
