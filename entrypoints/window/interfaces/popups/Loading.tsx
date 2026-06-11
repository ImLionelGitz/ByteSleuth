import { Paper } from '@mui/material'

export default function Loading() {
   return (
      <Paper
         sx={({ palette }) => ({
            padding: 2,
            maxWidth: 300,
            backgroundColor: palette.secondary.main,
         })}
      >
         <h2 style={{ color: 'aliceblue', textTransform: 'capitalize' }}>
            Loading Editor...
         </h2>
      </Paper>
   )
}
