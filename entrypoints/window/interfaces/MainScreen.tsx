import { Stack } from '@mui/material'
import ButtonPanel from './ButtonPanel'
import FieldsPanel from './FieldsPanel'
import { Panel } from './popups/InfoPanel'
import TablePanel from './TablePanel'
import type { Action } from '@/entrypoints/window/reducers/fieldReducer'
import { checkMemoryFull } from '@/helpers/datastores/fieldDatabase'
import { deleteScript } from '@/helpers/datastores/scriptDatabase'

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
   const { openEditor, showDialog, openSettings, allFields, allScripts } = props

   async function handleFieldAdd() {
      const full = await checkMemoryFull()
      if (!full) props.updater({ type: 'ADD' })
   }

   function handleFieldUpdate(field: FieldByte) {
      props.updater({ type: 'UPDATE', payload: field })
   }

   function handleFieldReorder(fields: FieldByte[]) {
      props.updater({ type: 'LOAD', payload: fields })
   }

   function handleFieldSelectorFound(id: number, selector: string) {
      props.updater({ type: 'SELECTOR_FOUND', payload: { id, selector } })
   }

   async function handleFieldDelete(id: number) {
      props.updater({ type: 'DELETE', payload: id })

      await deleteScript(id)
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
            <TablePanel
               size={TABLE_SIZE}
               data={[
                  { name: 'goku', price: '200', recoome: 'ha' },
                  { name: 'vegeta', price: '500', recoome: 'no' },
                  { name: 'broly', price: '1500', recoome: 'oh' },
               ]}
            />

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
                  selectorFound={handleFieldSelectorFound}
               />

               <ButtonPanel onPlay={() => {}} onSetting={openSettings} />
            </Stack>
         </Stack>
      </div>
   )
}
