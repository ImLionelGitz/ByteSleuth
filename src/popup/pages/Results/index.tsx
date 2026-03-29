import SplitButton from '@/popup/components/SplitButton'
import TableBit from '@/popup/components/Table'
import { SleuthTheme } from '@/popup/Theme'
import { TableData } from '@/Types'
import { ResultsField } from '@/Vars'
import { Paper, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Results() {
   const [tableData, setTable] = useState<TableData[]>([])

   useEffect(() => {
      chrome.storage.session.get(
         ResultsField,
         (res: Record<string, TableData[]>) => {
            setTable(res[ResultsField])
         }
      )

      chrome.storage.session.onChanged.addListener((change) => {
         if (change[ResultsField]) {
            setTable((change[ResultsField].newValue as TableData[]) || [])
         }
      })
   }, [])

   return (
      <SleuthTheme>
         <Stack
            direction="column"
            gap={1}
            sx={{ textAlign: 'center' }}
            padding={1.5}
         >
            <h1
               style={{
                  borderBottom: '1px solid',
                  paddingBottom: '6px',
                  marginBottom: '4px',
               }}
            >
               The Results
            </h1>

            <Paper
               sx={{
                  height: 350,
                  marginBottom: 1,
               }}
            >
               <TableBit data={tableData} />
            </Paper>

            <Stack alignItems="center">
               <SplitButton options={['zip', 'csv', 'json', 'xlns']} />
            </Stack>
         </Stack>
      </SleuthTheme>
   )
}
