import { sendToBackground } from '@/helpers/messager'
import { ROW_CONT_LOGIC } from '@/helpers/vars'
import { Button, Paper, Stack, Tooltip } from '@mui/material'
import { FaPlay } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { IoEyedrop } from 'react-icons/io5'

interface ButtonPanel {
   disableInteract: (v: boolean) => void
   onPlay: (intField: FieldByte) => void
   onSetting: () => void
}

export default function ButtonPanel(props: ButtonPanel) {
   const [rowField, setRowField] = useState<FieldByte>({
      id: ROW_CONT_LOGIC,
      name: 'Row Container',
      selector: '',
   })

   async function handleSample() {
      props.disableInteract(true)

      const selector = await sendToBackground<string>({
         message: 'select an element',
         fieldId: rowField.id,
      })

      if (selector) {
         setRowField({ ...rowField, selector: selector })
         props.disableInteract(false)
      }
   }

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
               onClick={() => props.onPlay(rowField)}
               sx={{
                  fontSize: 'x-large',
                  borderRadius: '100%',
                  padding: '10px',
                  minWidth: 0,
               }}
            >
               <FaPlay />
            </Button>

            <Tooltip title={rowField.selector}>
               <Button
                  variant="contained"
                  color={rowField.selector ? 'error' : 'info'}
                  disableElevation
                  onClick={handleSample}
                  sx={{
                     fontSize: 'x-large',
                     borderRadius: '100%',
                     padding: '10px',
                     minWidth: 0,
                  }}
               >
                  <IoEyedrop />
               </Button>
            </Tooltip>

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
