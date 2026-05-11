import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
   Button,
   IconButton,
   Input,
   ListItem,
   Paper,
   Stack,
} from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import { FaCircleNodes } from 'react-icons/fa6'
import { RxDragHandleDots2 } from 'react-icons/rx'

export default function FieldSlot({ id, name, selector }: FieldByte) {
   const { attributes, listeners, transform, transition, setNodeRef } =
      useSortable({ id: id })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: transform ? 999 : 'auto',
      backgroundColor: '#2c3549',
   }

   return (
      <Paper ref={setNodeRef} style={style} sx={{ margin: 1 }}>
         <ListItem disablePadding sx={{ gap: '6px' }}>
            <IconButton
               edge="end"
               size="small"
               sx={{ padding: 0 }}
               disableRipple
               {...attributes}
               {...listeners}
            >
               <RxDragHandleDots2 color="aliceblue" />
            </IconButton>

            <Stack sx={{ alignItems: 'center' }}>
               <Input
                  placeholder="Enter a name"
                  value={name}
                  disableUnderline
                  sx={{
                     width: '80%',
                     color: 'aliceblue',
                     fontSize: 14,
                  }}
                  onChange={() => {}}
               />

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
                  {selector ? 'Element Linked' : 'Link Element'}
               </Button>
            </Stack>

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
