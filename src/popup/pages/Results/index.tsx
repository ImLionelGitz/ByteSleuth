import SplitButton from '@/popup/components/SplitButton'
import TableBit from '@/popup/components/Table'
import { themeOptions } from '@/popup/Theme'
import { Divider, Paper, Stack, ThemeProvider } from '@mui/material'

export default function Results() {
   return (
      <ThemeProvider theme={themeOptions}>
         <Stack direction="column" gap={1} sx={{ textAlign: 'center' }}>
            <h1>The Results</h1>

            <Divider sx={{ background: 'aliceblue' }} />

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
      </ThemeProvider>
   )
}
