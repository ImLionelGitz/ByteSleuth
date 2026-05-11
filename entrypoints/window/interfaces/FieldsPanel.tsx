import { Button, List, Paper, Stack, useTheme } from '@mui/material'
import EmptyMessage from '../components/EmptyMsg'
import FieldSlot from '../components/FieldSlot'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Scrollbars } from 'react-custom-scrollbars-2'

interface FieldsPanel {
   allFields: FieldByte[]
   fieldAdd: () => void
}

export default function FieldsPanel({ allFields, fieldAdd }: FieldsPanel) {
   const { palette } = useTheme()

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
               //overflow: 'auto',
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
                  onClick={fieldAdd}
               >
                  +
               </Button>
            </Stack>

            {allFields.length > 0 ? (
               <List>
                  <Scrollbars
                     style={{ width: '100%', height: 222 }}
                     renderThumbVertical={({ style, ...props }) => (
                        <div
                           {...props}
                           style={{
                              ...style,
                              width: '50%',
                              backgroundColor: palette.secondary.main,
                              borderRadius: '4px',
                           }}
                        />
                     )}
                  >
                     <SortableContext
                        items={allFields}
                        strategy={verticalListSortingStrategy}
                     >
                        {allFields.map((field) => (
                           <FieldSlot key={field.id} {...field} />
                        ))}
                     </SortableContext>
                  </Scrollbars>
               </List>
            ) : (
               <EmptyMessage msg="No fields found!" />
            )}
         </Paper>
      </DndContext>
   )
}
