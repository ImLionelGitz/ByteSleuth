import PurpleUI from '@/assets/PurpleUI.png'
import { Box, Stack } from '@mui/material'

const ORG_WIDTH = 620
const ORG_HEIGHT = 413

export default function TablePanel({ scale }: { scale?: number }) {
   const width = ORG_WIDTH * (scale || 1)
   const height = ORG_HEIGHT * (scale || 1)

   return (
      <Box sx={{ width: width, height: height, overflow: 'hidden' }}>
         <img
            src={PurpleUI}
            style={{
               position: 'absolute',
               zIndex: -1,
               mixBlendMode: 'screen',
               width: width,
               height: height,
            }}
            alt=""
         />

         <Stack
            sx={{
               color: 'aliceblue',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <p>lolololol</p>
         </Stack>
      </Box>
   )
}
