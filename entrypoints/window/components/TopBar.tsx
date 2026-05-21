import { AppBar, Button, Checkbox, ListItem, Stack } from '@mui/material'
import { IoLink } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { MouseEvent } from 'react'
import FieldMenu from './FieldMenu'

interface TopBar {
   bgColor: string
   fields: FieldByte[]
   curEditingField: number
   onFieldCheck: (id: number, checked: boolean) => void
}

export default function TopBar(props: TopBar) {
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
            backgroundColor: props.bgColor,
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

         {props.curEditingField !== Math.PI && (
            <>
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
               >
                  {props.fields.map((field) => (
                     <ListItem
                        key={field.id}
                        secondaryAction={
                           <Checkbox
                              checked={props.curEditingField === field.id}
                              onChange={(_, checked) =>
                                 props.onFieldCheck(field.id, checked)
                              }
                           />
                        }
                        sx={{ fontSize: 15, fontFamily: 'Inter' }}
                     >
                        {field.name}
                     </ListItem>
                  ))}
               </FieldMenu>
            </>
         )}
      </AppBar>
   )
}
