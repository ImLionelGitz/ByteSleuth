import {
   Button,
   Input,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
} from '@mui/material'
import HoverButton from './HoverButton'
import { EntryBit } from '@/Types'
import sendRequest from '../helpers/messager'
import { BEGIN_SELECTION } from '@/Messages'

interface EntryEditor {
   allEntries: EntryBit[]
   entryChanged: (entry: EntryBit) => void
   entryRemoval: (entry: EntryBit) => void
}

interface Entry {
   token: EntryBit
   onNewValue: (e: EntryBit) => void
   onDelete: (e: EntryBit) => void
}

export default function EntryEditor(props: EntryEditor) {
   const { allEntries, entryChanged, entryRemoval } = props

   return (
      <List>
         {allEntries.map((entry) => (
            <Entry
               key={entry.id}
               token={entry}
               onNewValue={entryChanged}
               onDelete={entryRemoval}
            />
         ))}
      </List>
   )
}

function Entry({ token, onNewValue, onDelete }: Entry) {
   return (
      <ListItem alignItems="flex-start">
         <ListItemAvatar>
            <HoverButton onClick={() => onDelete(token)} />
         </ListItemAvatar>

         <ListItemText
            primary={
               <Input
                  placeholder="Enter a name"
                  value={token.name}
                  disableUnderline
                  sx={{ fontFamily: 'Bubbly', fontWeight: 900, width: '80%' }}
                  onChange={(e) =>
                     onNewValue({ ...token, name: e.target.value })
                  }
               />
            }
            secondary={
               <Button
                  variant="contained"
                  sx={{ fontFamily: 'Bubbly', fontWeight: 900 }}
                  onClick={() => sendRequest(BEGIN_SELECTION)}
               >
                  {token.selector ? token.selector : 'Pick an element'}
               </Button>
            }
         />
      </ListItem>
   )
}
