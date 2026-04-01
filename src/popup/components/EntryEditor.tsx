import { EntryBit, LocalData } from '@/Types'
import {
   Button,
   Checkbox,
   FormControlLabel,
   Input,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Stack,
} from '@mui/material'
import HoverButton from './HoverButton'

interface EntryEditor {
   allEntries: EntryBit[]
   entryBtnClicks: boolean
   entryChanged: (entry: EntryBit) => void
   entryRemoval: (entry: EntryBit) => void
}

interface Entry {
   token: EntryBit
   enabled: boolean
   onNewValue: (e: EntryBit) => void
   onDelete: (e: EntryBit) => void
}

export default function EntryEditor(props: EntryEditor) {
   const { allEntries, entryBtnClicks, entryChanged, entryRemoval } = props

   return (
      <List>
         {allEntries.map((entry) => (
            <Entry
               key={entry.id}
               token={entry}
               enabled={entryBtnClicks}
               onNewValue={entryChanged}
               onDelete={entryRemoval}
            />
         ))}
      </List>
   )
}

function Entry({ token, enabled, onNewValue, onDelete }: Entry) {
   return (
      <ListItem alignItems="flex-start">
         <ListItemAvatar>
            <HoverButton enabled={enabled} onClick={() => onDelete(token)} />
         </ListItemAvatar>

         <ListItemText
            primary={
               <Stack>
                  <Input
                     placeholder="Enter a name"
                     value={token.name}
                     disableUnderline
                     sx={{
                        fontFamily: 'Bubbly',
                        fontSize: 18,
                        fontWeight: 900,
                        width: '80%',
                     }}
                     onChange={(e) =>
                        onNewValue({ ...token, name: e.target.value })
                     }
                  />

                  <Input
                     placeholder="Add a filter"
                     value={token.regFilter}
                     disableUnderline
                     sx={{
                        fontFamily: 'Bubbly',
                        fontWeight: 100,
                        width: '80%',
                     }}
                     onChange={(e) =>
                        onNewValue({ ...token, regFilter: e.target.value })
                     }
                  />

                  <FormControlLabel
                     control={
                        <Checkbox
                           value={token.urlOnly}
                           onChange={(_, checked) =>
                              onNewValue({ ...token, urlOnly: checked })
                           }
                        />
                     }
                     label={<div>Extract URLs Only</div>}
                  />
               </Stack>
            }
            secondary={
               <Button
                  variant="contained"
                  sx={{ fontFamily: 'Bubbly', fontWeight: 900 }}
                  color={token.selector ? 'secondary' : 'primary'}
                  onClick={() => {
                     const data: LocalData = {
                        type: 'BEGIN_SELECTION',
                        payload: token.id,
                     }

                     window.parent.postMessage(data, '*')
                  }}
               >
                  {token.selector ? 'Element captured' : 'Pick an element'}
               </Button>
            }
         />
      </ListItem>
   )
}
