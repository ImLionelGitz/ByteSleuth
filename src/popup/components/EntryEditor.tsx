import {
   Button,
   Input,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
} from '@mui/material'
import HoverButton from './HoverButton'

export default function EntryEditor() {
   return (
      <List>
         <Entry />
         <Entry />
      </List>
   )
}

function Entry() {
   return (
      <ListItem alignItems="flex-start">
         <ListItemAvatar>
            <HoverButton />
         </ListItemAvatar>

         <ListItemText
            primary={
               <Input
                  placeholder="Enter a name"
                  disableUnderline
                  sx={{ fontFamily: 'Bubbly', fontWeight: 900, width: '80%' }}
               />
            }
            secondary={
               <Button
                  variant="contained"
                  sx={{ fontFamily: 'Bubbly', fontWeight: 900 }}
               >
                  Pick an element
               </Button>
            }
         />
      </ListItem>
   )
}
