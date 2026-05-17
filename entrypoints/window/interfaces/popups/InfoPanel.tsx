import { Button, Divider, Paper, Stack } from '@mui/material'
import { TbReload } from 'react-icons/tb'

type PanelType = 'INFO' | 'ERROR' | 'UI BROKEN'

export interface Panel {
   title: string
   msg: string
   type: PanelType
}

export default function InfoPanel({ title, msg, type }: Panel) {
   return (
      <Paper
         sx={({ palette }) => ({
            padding: 2,
            maxWidth: 250,
            backgroundColor: (() => {
               switch (type) {
                  case 'INFO':
                     return palette.secondary.main

                  case 'ERROR':
                     return palette.error.main

                  case 'UI BROKEN':
                     return palette.info.main
               }
            })(),
         })}
      >
         <Stack sx={{ textAlign: 'center', gap: 1 }}>
            <h2 style={{ color: 'aliceblue' }}>{title}</h2>

            <Divider />

            <p style={{ color: 'aliceblue' }}>{msg}</p>

            {type === 'UI BROKEN' && (
               <Stack sx={{ alignItems: 'center' }}>
                  <Button
                     variant="contained"
                     disableElevation
                     color="secondary"
                     size="small"
                     sx={{
                        fontFamily: 'Space-Grotesk',
                        gap: 0.7,
                        alignItems: 'center',
                     }}
                     onClick={() => window.location.reload()}
                  >
                     <TbReload />
                     Reload UI
                  </Button>
               </Stack>
            )}
         </Stack>
      </Paper>
   )
}
