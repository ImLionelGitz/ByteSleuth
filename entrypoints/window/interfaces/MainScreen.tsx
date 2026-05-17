import { Stack } from '@mui/material'
import ButtonPanel from './ButtonPanel'
import FieldsPanel from './FieldsPanel'
import TablePanel from './TablePanel'
import { checkMemoryFull } from '@/helpers/datastores/fieldDatabase'
import { Action } from '../myReducer'

const TABLE_SIZE = 390

interface MainScreen {
   allFields: FieldByte[]
   updater: (a: Action) => void
   openEditor: (id: number) => void
   showDialog: (s: boolean) => void
   openSettings: () => void
}

export default function MainScreen(props: MainScreen) {
   const { updater, openEditor, showDialog, openSettings, allFields } = props

   async function handleFieldAdd() {
      const full = await checkMemoryFull()

      if (!full) {
         updater({
            type: 'ADD',
            payload: {
               id: allFields.length,
               name: 'New Field',
               selector: '',
            },
         })
      }
   }

   function handleFieldUpdate(newField: FieldByte) {
      updater({ type: 'UPDATE', payload: newField })
   }

   function handleFieldDelete(id: number) {
      updater({ type: 'DELETE', payload: id })
   }

   function handleFieldReorder(newList: FieldByte[]) {
      updater({ type: 'LOAD', payload: newList })
   }

   return (
      <div>
         <Stack
            direction="row"
            sx={{
               height: '100vh',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '8px',
            }}
         >
            <TablePanel size={TABLE_SIZE} />

            <Stack sx={{ gap: '12px', height: TABLE_SIZE }}>
               <FieldsPanel
                  allFields={allFields}
                  fieldAdd={handleFieldAdd}
                  fieldUpdate={handleFieldUpdate}
                  fieldDelete={handleFieldDelete}
                  fieldReorder={handleFieldReorder}
                  openEditor={openEditor}
                  disableInteract={showDialog}
               />

               <ButtonPanel onPlay={() => {}} onSetting={openSettings} />
            </Stack>
         </Stack>
      </div>
   )
}
