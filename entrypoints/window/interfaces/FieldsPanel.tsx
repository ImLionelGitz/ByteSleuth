import { Button, List, Paper, Stack } from '@mui/material'
import EmptyMessage from '../components/EmptyMsg'
import FieldSlot from '../components/FieldSlot'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function FieldsPanel() {
   return (
      <DndContext
         collisionDetection={closestCenter}
         onDragOver={(e) => console.log(e.active.id)}
         onDragEnd={(e) => console.log(e)}
      >
         <Paper
            variant="outlined"
            sx={{
               width: 225,
               height: '100%',
               backgroundColor: '#181C30',
               overflow: 'hidden auto',
            }}
         >
            <Stack
               direction="row"
               sx={{ justifyContent: 'space-between', margin: '8px' }}
            >
               <h2>2. Table Fields</h2>

               <Button
                  variant="contained"
                  disableElevation
                  sx={{ width: 24, height: 24, minWidth: 0, fontSize: 28 }}
               >
                  +
               </Button>
            </Stack>

            {/* <EmptyMessage msg="No fields found!" /> */}

            <List>
               <SortableContext
                  items={[]}
                  strategy={verticalListSortingStrategy}
               >
                  {new Array(3).fill(0).map((_, key) => (
                     <FieldSlot key={key} id={key} />
                  ))}
               </SortableContext>
            </List>
         </Paper>
      </DndContext>
   )
}
