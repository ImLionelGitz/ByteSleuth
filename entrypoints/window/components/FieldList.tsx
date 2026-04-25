import {
   Button,
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemText,
   Stack,
   Tooltip,
} from '@mui/material'
import { FaCheck, FaPlus, FaSadCry } from 'react-icons/fa'

interface FieldList {
   info: SleuthInfo
   onBaseAssign: () => void
}

export default function FieldList({ info, onBaseAssign }: FieldList) {
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
         {info.main_selector ? (
            <WithSelector />
         ) : (
            <NoSelector onClick={onBaseAssign} />
         )}
      </Stack>
   )
}

function WithSelector() {
   return (
      <>
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
      </>
   )
}

function NoSelector({ onClick }: { onClick: () => void }) {
   return (
      <Stack
         sx={{
            color: 'aliceblue',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <FaSadCry />

         <h2>No Root Selector Picked</h2>

         <Button onClick={onClick}>Pick One</Button>
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
