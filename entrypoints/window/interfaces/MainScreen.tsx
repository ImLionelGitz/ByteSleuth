import type { Action } from '@/entrypoints/window/reducers/fieldReducer'
import { fieldQuotaFull } from '@/helpers/datastores/fieldDatabase'
import { deleteScript } from '@/helpers/datastores/scriptDatabase'
import { sendToBackground } from '@/helpers/messager'
import { Stack } from '@mui/material'
import ButtonPanel from './ButtonPanel'
import FieldsPanel from './FieldsPanel'
import { Panel } from './popups/InfoPanel'
import TablePanel from './TablePanel'

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

   const [tableData, setTableData] = useState<TableByte[]>([])

   async function handleFieldAdd() {
      const full = await fieldQuotaFull()

      if (!full) props.updater({ type: 'ADD' })
      else
         showDialog({
            type: 'ERROR',
            title: 'Field Limit Reached',
            msg: 'You have reached the maximum number of fields allowed. Please delete an existing field to add a new one.',
         })
   }

   function handleFieldUpdate(field: FieldByte) {
      props.updater({ type: 'UPDATE', payload: field })
   }

   function handleFieldReorder(fields: FieldByte[]) {
      console.log(fields, allFields)
      props.updater({ type: 'LOAD', payload: fields })
   }

   function handleFieldSelectorFound(id: number, selector: string) {
      props.updater({ type: 'SELECTOR_FOUND', payload: { id, selector } })
   }

   async function handleFieldDelete(id: number) {
      const hasScript = allScripts.some(
         (script) => script.linkedIDs.includes(id) || script.id === id
      )

      if (hasScript) {
         showDialog({
            title: 'Delete Linked Field?',
            msg: 'This field is currently associated with a custom script. Deleting it will also remove the script or unlink it from this field. Do you want to proceed?',
            type: 'WARNING',
            async onConfirm() {
               props.updater({ type: 'DELETE', payload: id })

               await deleteScript(id)
               showDialog(null)
            },
         })

         return
      }

      props.updater({ type: 'DELETE', payload: id })
   }

   function handleDialog(show: boolean) {
      if (show) {
         showDialog({
            title: 'Waiting for Selection',
            msg: 'Please click on an element in the browser tab to select it. To cancel, click anywhere outside of this dialog.',
            type: 'INFO',
         })
      } else {
         showDialog(null)
      }
   }

   async function handlePlay(internal: FieldByte) {
      if (!allFields.length) {
         props.showDialog({
            type: 'ERROR',
            title: 'No Fields Defined',
            msg: 'You have not defined any data fields to extract. Please add at least one field to continue.',
         })

         return
      }

      if (!internal.selector) {
         props.showDialog({
            type: 'ERROR',
            title: 'Root Element Required',
            msg: 'You have not selected a row container yet. Please select the main element that contains your data fields (like a product box) to continue.',
         })

         return
      }

      if (allFields.some((field) => !field.selector)) {
         props.showDialog({
            type: 'ERROR',
            title: 'Missing Selectors',
            msg: 'One or more fields in your list are not linked to an element. Please select an element for each field to proceed.',
         })

         return
      }

      const data = await sendToBackground<TableByte[] | null>({
         message: 'scrape',
         fields: [...allFields, internal],
      })

      setTableData(data || [])
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
            <TablePanel size={TABLE_SIZE} data={tableData} />

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

               <ButtonPanel
                  onPlay={handlePlay}
                  onSetting={openSettings}
                  disableInteract={handleDialog}
               />
            </Stack>
         </Stack>
      </div>
   )
}
