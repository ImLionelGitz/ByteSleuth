import { Button, Paper, Stack, useTheme } from '@mui/material'
import { TiExport } from 'react-icons/ti'

interface TablePanel {
   size: number
}

export default function TablePanel({ size }: TablePanel) {
   const { palette } = useTheme()

   return (
      <Paper
         variant="outlined"
         sx={{
            width: size,
            height: size,
            borderTop: 'none',
            backgroundColor: '#181C30',
         }}
      >
         <div
            className="bg-inherit border border-purple-500/20"
            style={{
               clipPath:
                  'polygon(0px 20px, 0px 0px, calc(100% - 80px) 0px, calc(100% - 60px) 20px, 100% 20px, 100% 100%, 0px 100%)',
               position: 'absolute',
               height: '20px',
               width: '50%',
               zIndex: '-1',
               borderTopLeftRadius: 'inherit',
               top: '12px',
               left: '21px',
            }}
         ></div>

         <Stack sx={{ height: '100%' }}>
            <Stack
               direction="row"
               sx={{ alignItems: 'center', gap: '12px', marginLeft: '8px' }}
            >
               <img src="/wxt.svg" alt="" width={32} height={32} />
               <h1>ByteSleuth</h1>
               <p
                  className="px-1 rounded-[14px]"
                  style={{
                     backgroundColor: palette.secondary.main,
                     color: palette.secondary.contrastText,
                  }}
               >
                  v1.0.0
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
                  sx={{ alignItems: 'center', justifyContent: 'space-between' }}
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
                        12 Rows
                     </p>
                  </Stack>

                  <Button
                     variant="contained"
                     size="small"
                     disableElevation
                     sx={{
                        fontFamily: 'Inter',
                        textTransform: 'capitalize',
                        gap: 0.5,
                     }}
                  >
                     <TiExport fontSize={14} />
                     Export CSV
                  </Button>
               </Stack>
            </Stack>
         </Stack>
      </Paper>
   )
}
