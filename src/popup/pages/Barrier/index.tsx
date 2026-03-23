import GlowingImage from '@/popup/components/GlowingImg'
import { themeOptions } from '@/popup/Theme'
import { Stack, ThemeProvider } from '@mui/material'

export default function Barrier() {
   return (
      <ThemeProvider theme={themeOptions}>
         <Stack
            direction="column"
            gap={1}
            sx={{ textAlign: 'center', alignItems: 'center' }}
         >
            <h1>Finding and finding and finding</h1>

            <GlowingImage src="/crx.svg" />
         </Stack>
      </ThemeProvider>
   )
}
