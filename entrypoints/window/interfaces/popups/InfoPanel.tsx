import { Divider, Paper, Stack } from '@mui/material'

interface InfoPanel {
   title: string
   msg: string
   type: 'INFO' | 'ERROR'
}

export default function InfoPanel({ title, msg, type }: InfoPanel) {
   return (
      <Paper
         sx={({ palette }) => ({
            padding: 2,
            maxWidth: 250,
            backgroundColor:
               type === 'ERROR' ? palette.error.main : palette.secondary.main,
         })}
      >
         <Stack sx={{ textAlign: 'center', gap: 1 }}>
            <h2 style={{ color: 'aliceblue' }}>{title}</h2>

            <Divider />

            <p style={{ color: 'aliceblue' }}>{msg}</p>

            {/* <em>{'(Click outside to exit the popup.)'}</em> */}
         </Stack>
      </Paper>
   )
}
