import GlowingImage from '@/popup/components/GlowingImg'
import { SleuthTheme } from '@/popup/Theme'
import { GlobalStyles, Stack } from '@mui/material'

export default function Barrier() {
   return (
      <SleuthTheme>
         <GlobalStyles
            styles={({ palette }) => ({
               body: { backgroundColor: palette.primary.main },
            })}
         />

         <Stack
            direction="column"
            gap={1}
            textAlign="center"
            alignItems="center"
         >
            <h1>Finding and finding and finding</h1>

            <GlowingImage src="/crx.svg" />
         </Stack>
      </SleuthTheme>
   )
}
