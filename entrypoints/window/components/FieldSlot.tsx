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
   useTheme,
} from '@mui/material'
import type { FocusEvent } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaFileCircleCheck, FaFileCircleXmark } from 'react-icons/fa6'
import { RxDragHandleDots2 } from 'react-icons/rx'

interface FieldSlot extends FieldByte {
   isLinked: boolean
   linkElem: () => void
   updateName: (s: string) => void
   deleteItem: (id: number) => void
   openEditor: (id: number) => void
   existence: (name: string) => boolean
}

export default function FieldSlot(props: FieldSlot) {
   const { attributes, listeners, transform, transition, setNodeRef } =
      useSortable({ id: props.id })

   const [input, setInput] = useState(props.name)
   const { palette } = useTheme()

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: transform ? 999 : 'auto',
      backgroundColor: '#2c3549',
   }

   const onChange = (e: FocusEvent<HTMLInputElement>) => {
      const newVal = e.target.value

      if (!props.existence(newVal)) {
         props.updateName(newVal)
         setInput(newVal)
      } else setInput(props.name)
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
                  value={input}
                  disableUnderline
                  sx={{
                     width: '80%',
                     color: 'aliceblue',
                     fontSize: 14,
                  }}
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') {
                        e.currentTarget.blur()
                     }
                  }}
                  onChange={(e) => setInput(e.target.value)}
                  onBlur={onChange}
               />

               <Tooltip title={props.selector}>
                  <Button
                     sx={({ palette }) => ({
                        fontSize: 12,
                        fontFamily: 'Inter',
                        padding: 0,
                        width: 110,
                        minWidth: 0,
                        overflow: 'hidden',
                        color: props.selector
                           ? '#bc0a0e'
                           : palette.secondary.main,
                     })}
                     onClick={props.linkElem}
                  >
                     {props.selector ? 'Element Linked' : 'Link Element'}
                  </Button>
               </Tooltip>
            </Stack>

            <Stack direction="row">
               <IconButton
                  size="small"
                  onClick={() => props.openEditor(props.id)}
               >
                  {props.isLinked ? (
                     <FaFileCircleCheck color={palette.secondary.main} />
                  ) : (
                     <FaFileCircleXmark color={palette.error.main} />
                  )}
               </IconButton>

               <IconButton
                  size="small"
                  onClick={() => props.deleteItem(props.id)}
               >
                  <FaTrash color="aliceblue" />
               </IconButton>
            </Stack>
         </ListItem>
      </Paper>
   )
}
