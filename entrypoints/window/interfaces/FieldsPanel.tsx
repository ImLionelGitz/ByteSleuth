import { Button, List, Paper, Stack, useTheme } from '@mui/material'
import EmptyMessage from '../components/EmptyMsg'
import FieldSlot from '../components/FieldSlot'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import {
   arrayMove,
   SortableContext,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { getCurrentTabID, sendToContentJS } from '@/helpers/messager'

interface FieldsPanel {
   allFields: FieldByte[]
   allScripts: Script[]
   disableInteract: (v: boolean) => void
   openEditor: (id: number) => void
   fieldAdd: () => void
   fieldUpdate: (f: FieldByte) => void
   fieldReorder: (a: FieldByte[]) => void
   fieldDelete: (id: number) => void
}

export default function FieldsPanel(props: FieldsPanel) {
   const {
      allFields,
      allScripts,
      fieldAdd,
      fieldUpdate,
      fieldReorder,
      fieldDelete,
      disableInteract,
      openEditor,
   } = props
   const { palette } = useTheme()

   const handleLink = async (oldField: FieldByte) => {
      try {
         disableInteract(true)
         const tabID = await getCurrentTabID()

         if (tabID) {
            const select = await sendToContentJS<string>(tabID, {
               message: 'select an element',
            })

            fieldUpdate({ ...oldField, selector: select })
         }
      } finally {
         disableInteract(false)
      }
   }

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event
      if (over && active.id !== over.id) {
         const oldIndex = allFields.findIndex((item) => item.id === active.id)
         const newIndex = allFields.findIndex((item) => item.id === over.id)
         const newArray = arrayMove(allFields, oldIndex, newIndex)

         fieldReorder(newArray)
      }
   }

   const handleRename = (oldField: FieldByte, newName: string) => {
      fieldUpdate({ ...oldField, name: newName })
   }

   return (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
                           <FieldSlot
                              key={field.id}
                              {...field}
                              isLinked={allScripts.some((script) =>
                                 script.linkedIDs.includes(field.id)
                              )}
                              linkElem={() => handleLink(field)}
                              updateName={(name) => handleRename(field, name)}
                              deleteItem={(id) => fieldDelete(id)}
                              openEditor={openEditor}
                           />
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
