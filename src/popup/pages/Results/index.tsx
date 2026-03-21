import { themeOptions } from '@/popup/Theme'
import { Button, Divider, Stack, ThemeProvider } from '@mui/material'

type colorData = {
   title: string
   color: string
}

export default function Results() {
   return (
      <ThemeProvider theme={themeOptions}>
         <Stack direction="column" gap={1}>
            <Stack direction="row" gap={1}>
               <h1>Settings</h1>
            </Stack>

            <Divider sx={{ background: 'aliceblue' }} />

            <Stack gap={2}>
               <ColorPicker title="Background Color" color="aliceblue" />
               <ColorPicker title="Foreground Color" color="aliceblue" />
               <ColorPicker title="Highlight Color" color="aliceblue" />
               <ColorPicker title="Rejection Color" color="aliceblue" />
               <ColorPicker title="Text Color" color="aliceblue" />
            </Stack>

            <Stack
               direction="row"
               sx={{ justifyContent: 'space-around', marginTop: '8%' }}
            >
               <Button variant="contained" sx={{ fontFamily: 'Bubbly' }}>
                  Save Changes
               </Button>

               <Button
                  variant="contained"
                  color="secondary"
                  sx={{ fontFamily: 'Bubbly' }}
               >
                  Reset
               </Button>
            </Stack>
         </Stack>
      </ThemeProvider>
   )
}

function ColorPicker({ title, color }: colorData) {
   return (
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
         <h3>{title}</h3>
         <Button sx={{ background: color, minWidth: 24 }}></Button>
      </Stack>
   )
}
