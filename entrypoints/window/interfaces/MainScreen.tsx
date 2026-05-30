import {
   directSaveFields,
   checkMemoryFull,
   deleteField,
   addField,
   updateField,
} from '@/helpers/datastores/fieldDatabase'
import { Stack } from '@mui/material'
import ButtonPanel from './ButtonPanel'
import FieldsPanel from './FieldsPanel'
import { Panel } from './popups/InfoPanel'
import TablePanel from './TablePanel'

const TABLE_SIZE = 390

interface MainScreen {
   allFields: FieldByte[]
   allScripts: never[]
   openEditor: (id: number) => void
   showDialog: (p: Panel | null) => void
   openSettings: () => void
}

export default function MainScreen(props: MainScreen) {
   const { openEditor, showDialog, openSettings, allFields, allScripts } = props

   async function handleFieldAdd() {
      const full = await checkMemoryFull()
      if (!full) addField()
   }

   function handleFieldDelete(id: number) {
      deleteField(id)

      // const hasScript = allScripts.some((script) =>
      //    script.linkedIDs.includes(id)
      // )
      // if (hasScript) {
      //    showDialog({
      //       title: 'This Field Has Scripts',
      //       msg: 'Are you sure you want to delete this field?',
      //       type: 'WARNING',
      //       onConfirm() {
      //          updater({ type: 'DELETE', payload: id })
      //          showDialog(null)
      //       },
      //    })
      // } else {
      //    updater({ type: 'DELETE', payload: id })
      // }
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
                  fieldUpdate={updateField}
                  fieldDelete={handleFieldDelete}
                  fieldReorder={directSaveFields}
                  openEditor={openEditor}
                  disableInteract={handleDialog}
               />

               <ButtonPanel onPlay={() => {}} onSetting={openSettings} />
            </Stack>
         </Stack>
      </div>
   )
}
