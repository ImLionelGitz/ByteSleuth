import { Button, Paper, Stack } from '@mui/material'

export default function FieldsPanel() {
   return (
      <Paper variant="outlined" sx={{ width: 200, height: '100%' }}>
         <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', margin: '8px' }}
         >
            <h2>2. Table Fields</h2>

            <Button
               variant="contained"
               disableElevation
               sx={{ width: 24, height: 24, minWidth: 0, fontSize: 28 }}
            >
               +
            </Button>
         </Stack>
      </Paper>
   )
}
