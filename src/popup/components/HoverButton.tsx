import { IconButton } from '@mui/material'
import { useState } from 'react'
import { BsClipboard2DataFill } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'

interface HoverButton {
   enabled: boolean
   onClick: () => void
}

export default function HoverButton({ enabled, onClick }: HoverButton) {
   const [hovered, setHovered] = useState(false)

   return (
      <IconButton
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={onClick}
         disabled={enabled}
         sx={({ palette }) => ({
            backgroundColor: '#bdbdbd',
            transition: 'all 0.3s ease',
            position: 'relative',
            width: 48,
            height: 48,

            '&:hover': {
               backgroundColor: palette.secondary.main,
            },
         })}
      >
         <BsClipboard2DataFill
            style={{
               position: 'absolute',
               opacity: hovered ? 0 : 1,
               transition: '0.2s',
            }}
         />
         <FaXmark
            style={{
               position: 'absolute',
               opacity: hovered ? 1 : 0,
               transition: '0.2s',
               color: 'white',
            }}
         />
      </IconButton>
   )
}
