import {
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemText,
   Stack,
   Tooltip,
} from '@mui/material'
import { FaCheck, FaPlus } from 'react-icons/fa'

export default function FieldList() {
   return (
      <Stack
         sx={{
            color: 'aliceblue',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '25px',
            paddingLeft: '4px',
         }}
      >
         <Stack
            direction="row"
            sx={{ justifyContent: 'space-around', width: '100%' }}
         >
            <h2>Table Fields</h2>

            <IconButton>
               <FaPlus />
            </IconButton>
         </Stack>

         <Divider
            orientation="horizontal"
            sx={{
               height: 2,
               width: '88%',
               background: 'radial-gradient(aliceblue, transparent)',
            }}
         />

         <List sx={{ overflow: 'hidden auto', width: '84%', height: '54%' }}>
            {Array(2)
               .fill(0)
               .map((_, index) => (
                  <Field key={index} />
               ))}
         </List>
      </Stack>
   )
}

function Field() {
   return (
      <ListItem disablePadding sx={{ gap: 1 }}>
         <IconButton size="small">
            <FaPlus />
         </IconButton>

         <ListItemText>lol</ListItemText>

         <Tooltip title="Object linked">
            <FaCheck />
         </Tooltip>
      </ListItem>
   )
}
