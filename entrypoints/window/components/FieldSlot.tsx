import {
   Button,
   IconButton,
   Input,
   ListItem,
   ListItemText,
   Paper,
   Stack,
} from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import { FaCircleNodes } from 'react-icons/fa6'
import { RxDragHandleDots2 } from 'react-icons/rx'

export default function FieldSlot() {
   return (
      <Paper sx={{ margin: 1, backgroundColor: '#2c3549' }}>
         <ListItem disablePadding sx={{ gap: 1, paddingLeft: 1 }}>
            <RxDragHandleDots2 fontSize={30} color="aliceblue" />

            <ListItemText
               primary={
                  <Input
                     placeholder="Enter a name"
                     value={'lololoolololololololoololololo lololoololololo'}
                     disableUnderline
                     sx={{
                        width: '80%',
                        color: 'aliceblue',
                        fontSize: 14,
                     }}
                     onChange={() => {}}
                  />
               }
               secondary={
                  <Button
                     sx={{
                        fontSize: 12,
                        fontFamily: 'Inter',
                        padding: 0,
                        width: 110,
                        minWidth: 0,
                        overflow: 'hidden',
                     }}
                     color="secondary"
                  >
                     Link Element
                  </Button>
               }
            />

            <Stack direction="row">
               <IconButton size="small">
                  <FaCircleNodes color="aliceblue" />
               </IconButton>

               <IconButton size="small">
                  <FaTrash color="aliceblue" />
               </IconButton>
            </Stack>
         </ListItem>
      </Paper>
   )
}
