import { useState } from 'react'
import { IconButton, useTheme } from '@mui/material'
import { BsClipboard2DataFill } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'

export default function HoverButton({ onClick }: { onClick: () => void }) {
   const [hovered, setHovered] = useState(false)
   const theme = useTheme()

   return (
      <IconButton
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={onClick}
         sx={{
            backgroundColor: '#bdbdbd',
            transition: 'all 0.3s ease',
            position: 'relative',
            width: 48,
            height: 48,

            '&:hover': {
               backgroundColor: theme.palette.secondary.main,
            },
         }}
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
