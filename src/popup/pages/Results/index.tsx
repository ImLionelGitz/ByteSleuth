import SplitButton from '@/popup/components/SplitButton'
import TableBit from '@/popup/components/Table'
import { SleuthTheme } from '@/popup/Theme'
import { Paper, Stack } from '@mui/material'

export default function Results() {
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
               <TableBit
                  data={[
                     { title: 'names', data: ['broly', 'goku'] },
                     { title: 'income', data: ['$100'] },
                  ]}
               />
            </Paper>

            <Stack alignItems="center">
               <SplitButton options={['zip', 'csv', 'json', 'xlns']} />
            </Stack>
         </Stack>
      </SleuthTheme>
   )
}
