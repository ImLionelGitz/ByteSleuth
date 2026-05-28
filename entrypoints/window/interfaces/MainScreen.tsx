import { Stack } from '@mui/material'
import ButtonPanel from './ButtonPanel'
import FieldsPanel from './FieldsPanel'
import TablePanel from './TablePanel'
import { checkMemoryFull } from '@/helpers/datastores/fieldDatabase'
import { Action } from '../reducers/fieldReducer'
import { Panel } from './popups/InfoPanel'

const TABLE_SIZE = 390

interface MainScreen {
   allFields: FieldByte[]
   allScripts: Script[]
   updater: (a: Action) => void
   openEditor: (id: number) => void
   showDialog: (p: Panel | null) => void
   openSettings: () => void
}

export default function MainScreen(props: MainScreen) {
   const {
      updater,
      openEditor,
      showDialog,
      openSettings,
      allFields,
      allScripts,
   } = props

   async function handleFieldAdd() {
      const full = await checkMemoryFull()

      if (!full) {
         updater({
            type: 'ADD',
            payload: {
               id:
                  allFields.length > 0
                     ? Math.max(...allFields.map((f) => f.id)) + 1
                     : 0,
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
      const hasScript = allScripts.some((script) =>
         script.linkedIDs.includes(id)
      )

      if (hasScript) {
         showDialog({
            title: 'This Field Has Scripts',
            msg: 'Are you sure you want to delete this field?',
            type: 'WARNING',
            onConfirm() {
               updater({ type: 'DELETE', payload: id })
               showDialog(null)
            },
         })
      } else {
         updater({ type: 'DELETE', payload: id })
      }
   }

   function handleFieldReorder(newList: FieldByte[]) {
      updater({ type: 'LOAD', payload: newList })
   }

   function handleDialog(show: boolean) {
      if (show) {
         showDialog({
            title: 'Selecting',
            msg: 'Click anywhere outside of this dialog within the window to exit',
            type: 'INFO',
         })
      } else {
         showDialog(null)
      }
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
                  allScripts={allScripts}
                  fieldAdd={handleFieldAdd}
                  fieldUpdate={handleFieldUpdate}
                  fieldDelete={handleFieldDelete}
                  fieldReorder={handleFieldReorder}
                  openEditor={openEditor}
                  disableInteract={handleDialog}
               />

               <ButtonPanel onPlay={() => {}} onSetting={openSettings} />
            </Stack>
         </Stack>
      </div>
   )
}
