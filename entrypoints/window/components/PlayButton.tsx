import GrayBtn from '@/assets/button.png'
import { Button } from '@mui/material'
import { FaPlay } from 'react-icons/fa'

const ORG_Size = 80

export default function PlayButton({
   scale,
   onClick,
}: {
   scale?: number
   onClick: () => void
}) {
   const width = ORG_Size * (scale || 1)
   const height = ORG_Size * (scale || 1)

   return (
      <Button
         onClick={onClick}
         sx={{
            width: width,
            height: height,
            fontSize: 'xx-large',
            color: 'aliceblue',
         }}
      >
         <img
            src={GrayBtn}
            style={{
               position: 'absolute',
               zIndex: -1,
               mixBlendMode: 'screen',
               width: width,
               height: height,
            }}
            alt=""
         />

         <FaPlay />
      </Button>
   )
}
