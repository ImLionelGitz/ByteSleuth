import { AppBar, Button, Stack } from '@mui/material'
import { IoLink } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { MouseEvent } from 'react'
import FieldMenu from './FieldMenu'

interface TopBar {
   bgColor: string
}

export default function TopBar({ bgColor }: TopBar) {
   const [fieldsAnchor, setFieldsAnchor] = useState<HTMLElement | null>(null)

   const buttons: Record<string, (e: MouseEvent<HTMLElement>) => void> = {
      new: () => {
         console.log('goku')
      },
      open: () => {},
      save: () => {},
   }

   return (
      <AppBar
         elevation={0}
         sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            backgroundColor: bgColor,
         }}
      >
         <Stack direction="row" sx={{ gap: 1.2 }}>
            {Object.keys(buttons).map((name) => (
               <Button
                  key={name}
                  sx={{
                     minWidth: 0,
                     color: 'aliceblue',
                     textTransform: 'capitalize',
                     fontFamily: 'Space-Grotesk',
                  }}
                  onClick={buttons[name]}
               >
                  {name}
               </Button>
            ))}
         </Stack>

         <Button
            variant="text"
            size="small"
            startIcon={<IoLink />}
            endIcon={<MdOutlineKeyboardArrowDown />}
            sx={({ palette }) => ({
               color: 'aliceblue',
               textTransform: 'capitalize',
               fontFamily: 'Space-Grotesk',
               transition: 'none',
               padding: 0.5,
               backgroundColor: fieldsAnchor
                  ? palette.primary.main
                  : 'transparent',
            })}
            onClick={(e) => setFieldsAnchor(e.currentTarget)}
         >
            Link To Fields
         </Button>

         <FieldMenu
            open={fieldsAnchor !== null}
            anchorEl={fieldsAnchor}
            onClose={() => setFieldsAnchor(null)}
         />
      </AppBar>
   )
}
