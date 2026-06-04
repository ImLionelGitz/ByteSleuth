import { Stack } from '@mui/material'
import ButtonPanel from './ButtonPanel'
import FieldsPanel from './FieldsPanel'
import { Panel } from './popups/InfoPanel'
import TablePanel from './TablePanel'
import type { Action } from '@/entrypoints/window/reducers/fieldReducer'
import { fieldQuotaFull } from '@/helpers/datastores/fieldDatabase'
import { deleteScript } from '@/helpers/datastores/scriptDatabase'
import { sendToBackground } from '@/helpers/messager'
import { ROW_CONT_LOGIC } from '@/helpers/vars'
import { transmit } from '@/helpers/pinger'

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

   const rowField = useMemo(
      () => allFields.find((f) => f.id === ROW_CONT_LOGIC),
      [allFields]
   )

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

   async function handlePlay() {
      const rowField = allFields.find((field) => field.id === ROW_CONT_LOGIC)
      if (!rowField) return

      if (allFields.length <= 1) {
         props.showDialog({
            type: 'ERROR',
            title: 'No Fields are specified',
            msg: 'Please add some fields to continue',
         })

         return
      }

      if (!rowField.selector) {
         props.showDialog({
            type: 'ERROR',
            title: 'No Root Element is specified',
            msg: 'Please specify a root element to continue',
         })

         return
      }

      const data = await sendToBackground<TableByte[] | null>({
         message: 'scrape',
         fields: allFields,
      })

      setTableData(data || [])
   }

   function handleSampling() {
      if (!rowField) return

      console.log(rowField)
      transmit({
         message: 'sample row container',
         rowField: rowField,
      })
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

               {rowField && (
                  <ButtonPanel
                     rowField={rowField}
                     onPlay={handlePlay}
                     onSetting={openSettings}
                     onSample={handleSampling}
                  />
               )}
            </Stack>
         </Stack>
      </div>
   )
}
