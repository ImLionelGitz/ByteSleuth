import { Paper, Stack, useTheme } from '@mui/material'
import EmptyMessage from '../components/EmptyMsg'
import SplitButton from '../components/SplitButton'
import DaTable from '../components/Table'
import exportJson from '@/helpers/exporters/json'
import exportCsv from '@/helpers/exporters/csv'
import { copyAsCsv, copyAsJson } from '@/helpers/exporters/copy'

interface TablePanel {
   name: string
   version: string
   size: number
   data: TableByte[]
}

export default function TablePanel({ size, data, name, version }: TablePanel) {
   const { palette } = useTheme()

   const handleExport = (option: ExportOptions) => {
      if (data.length === 0) return

      switch (option) {
         case 'JSON':
            exportJson(data)
            break

         case 'CSV':
            exportCsv(data)
            break

         case 'XLSX': {
            const run = async () => {
               const { default: exportExcel } =
                  await import('@/helpers/exporters/excel')

               await exportExcel(data)
            }

            run()
            break
         }

         case 'Copy to JSON':
            copyAsJson(data)
            break

         case 'Copy to CSV':
            copyAsCsv(data)
            break
      }
   }

   return (
      <Paper
         variant="outlined"
         sx={{
            width: size,
            height: size,
            borderTop: 'none',
            backgroundColor: 'transparent',
         }}
      >
         <Stack sx={{ height: '100%' }}>
            <div
               className="bg-inherit border"
               style={{
                  clipPath:
                     'polygon(0px 20px, 0px 0px, calc(100% - 80px) 0px, calc(100% - 60px) 20px, 100% 20px, 100% 100%, 0px 100%)',
                  height: '20px',
                  width: '80%',
                  zIndex: '-1',
                  borderTopLeftRadius: '4px',
                  backgroundColor: '#181C30',
                  position: 'relative',
                  top: '1px',
                  right: '0.5px',
               }}
            ></div>

            <Stack
               sx={{
                  height: '100%',
                  backgroundColor: '#181C30',
                  borderTopRightRadius: '4px',
               }}
            >
               <Stack
                  direction="row"
                  sx={{ alignItems: 'center', gap: '12px', marginLeft: '8px' }}
               >
                  <img src="/icon/32.png" alt="" width={32} height={32} />
                  <h1>{name}</h1>
                  <p
                     className="px-1 rounded-[14px]"
                     style={{
                        backgroundColor: palette.secondary.main,
                        color: palette.secondary.contrastText,
                     }}
                  >
                     {version}
                  </p>
               </Stack>

               <Stack
                  sx={{
                     height: '100%',
                     background: '#101623',
                     borderRadius: '5px',
                     marginTop: '8px',
                  }}
               >
                  <Stack
                     direction="row"
                     className="m-2"
                     sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}
                  >
                     <Stack
                        direction="row"
                        sx={{ alignItems: 'center', gap: '12px' }}
                     >
                        <h2>3. Results</h2>
                        <p
                           className="p-1 rounded-lg"
                           style={{
                              backgroundColor: palette.secondary.main,
                              color: palette.secondary.contrastText,
                           }}
                        >
                           {`${data.length} Rows`}
                        </p>
                     </Stack>

                     <SplitButton onClick={handleExport} />
                  </Stack>

                  {data.length > 0 ? (
                     <DaTable table={data} />
                  ) : (
                     <EmptyMessage msg="No rows found!" />
                  )}
               </Stack>
            </Stack>
         </Stack>
      </Paper>
   )
}
