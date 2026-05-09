import { Button, Paper, Stack } from '@mui/material'
import { FaPlay } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'

export default function ButtonPanel() {
   return (
      <Paper
         variant="outlined"
         sx={{ height: '33%', backgroundColor: '#181C30' }}
      >
         <h2 className="m-1.5">1. Controls</h2>

         <Stack direction="row" sx={{ justifyContent: 'space-evenly' }}>
            <Button
               variant="contained"
               disableElevation
               sx={{
                  fontSize: 'x-large',
                  borderRadius: '100%',
                  padding: '10px',
                  minWidth: 0,
               }}
            >
               <FaPlay />
            </Button>

            <Button
               variant="contained"
               disableElevation
               sx={{
                  fontSize: 'x-large',
                  borderRadius: '100%',
                  padding: '10px',
                  minWidth: 0,
               }}
            >
               <FaGear />
            </Button>
         </Stack>
      </Paper>
   )
}
