import { Button, Paper, Stack } from '@mui/material'
import { FaPlay } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { IoEyedrop } from 'react-icons/io5'

interface ButtonPanel {
   rowField: FieldByte
   onPlay: () => void
   onSample: () => void
   onSetting: () => void
}

export default function ButtonPanel(props: ButtonPanel) {
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
               onClick={props.onPlay}
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
               color={props.rowField.selector ? 'error' : 'info'}
               disableElevation
               onClick={props.onSample}
               sx={{
                  fontSize: 'x-large',
                  borderRadius: '100%',
                  padding: '10px',
                  minWidth: 0,
                  // backgroundColor: props.rowField.selector
                  //    ? '#bc0a0e'
                  //    : palette.info.main,
               }}
            >
               <IoEyedrop />
            </Button>

            <Button
               variant="contained"
               color="info"
               disableElevation
               onClick={props.onSetting}
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
