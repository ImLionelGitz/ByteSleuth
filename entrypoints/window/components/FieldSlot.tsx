import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
   Button,
   IconButton,
   Input,
   ListItem,
   Paper,
   Stack,
   Tooltip,
} from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import { FaCircleNodes } from 'react-icons/fa6'
import { RxDragHandleDots2 } from 'react-icons/rx'

interface FieldSlot extends FieldByte {
   linkElem: () => void
   updateName: (s: string) => void
   deleteItem: (id: number) => void
}

export default function FieldSlot(props: FieldSlot) {
   const { id, name, selector, linkElem, updateName, deleteItem } = props
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
                  onChange={(e) => updateName(e.target.value)}
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') {
                        e.currentTarget.blur()
                     }
                  }}
               />

               <Tooltip title={selector}>
                  <Button
                     sx={({ palette }) => ({
                        fontSize: 12,
                        fontFamily: 'Inter',
                        padding: 0,
                        width: 110,
                        minWidth: 0,
                        overflow: 'hidden',
                        color: selector ? '#bc0a0e' : palette.secondary.main,
                     })}
                     onClick={linkElem}
                  >
                     {selector ? 'Element Linked' : 'Link Element'}
                  </Button>
               </Tooltip>
            </Stack>

            <Stack direction="row">
               <IconButton size="small">
                  <FaCircleNodes color="aliceblue" />
               </IconButton>

               <IconButton size="small" onClick={() => deleteItem(id)}>
                  <FaTrash color="aliceblue" />
               </IconButton>
            </Stack>
         </ListItem>
      </Paper>
   )
}
