import { AppBar, Button } from '@mui/material'
import { IoLink } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import AddMenu from './AddMenu'
import { MouseEvent } from 'react'
import FieldMenu from './FieldMenu'

export default function TopBar() {
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
         color="transparent"
         elevation={0}
         sx={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 1,
            gap: 1.2,
         }}
      >
         <Button
            variant="text"
            startIcon={<IoLink />}
            endIcon={<MdOutlineKeyboardArrowDown />}
            sx={({ palette }) => ({
               color: 'aliceblue',
               outline: '2px solid aliceblue',
               textTransform: 'capitalize',
               fontFamily: 'Space-Grotesk',
               transition: 'none',
               backgroundColor: fieldsAnchor
                  ? palette.primary.main
                  : 'transparent',
            })}
            onClick={(e) => setFieldsAnchor(e.currentTarget)}
         >
            Link To Fields
         </Button>

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

         <AddMenu />

         <FieldMenu
            open={fieldsAnchor !== null}
            anchorEl={fieldsAnchor}
            onClose={() => setFieldsAnchor(null)}
         />
      </AppBar>
   )
}
