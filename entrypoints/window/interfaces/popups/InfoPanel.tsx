import { Button, Divider, Paper, Stack } from '@mui/material'
import { TbReload } from 'react-icons/tb'

type PanelType = 'INFO' | 'ERROR' | 'UI BROKEN' | 'WARNING'

export interface Panel {
   title: string
   msg: string
   type: PanelType
   onConfirm?: () => void
}

export default function InfoPanel({ title, msg, type, onConfirm }: Panel) {
   return (
      <Paper
         sx={({ palette }) => ({
            padding: 2,
            maxWidth: 300,
            backgroundColor: (() => {
               switch (type) {
                  case 'INFO':
                     return palette.secondary.main

                  case 'ERROR':
                     return palette.error.main

                  case 'UI BROKEN':
                     return palette.info.main

                  case 'WARNING':
                     return palette.warning.dark
               }
            })(),
         })}
      >
         <Stack sx={{ textAlign: 'center', gap: 1 }}>
            <h2 style={{ color: 'aliceblue', textTransform: 'capitalize' }}>
               {title}
            </h2>

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

            {type === 'WARNING' && onConfirm && (
               <Stack
                  direction="row"
                  sx={{ justifyContent: 'center', marginTop: 1 }}
               >
                  <Button
                     variant="contained"
                     disableElevation
                     color="secondary"
                     size="small"
                     sx={{ fontFamily: 'Space-Grotesk' }}
                     onClick={onConfirm}
                  >
                     Confirm
                  </Button>
               </Stack>
            )}
         </Stack>
      </Paper>
   )
}
