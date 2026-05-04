import { sendToBackground, sendToContentJS } from '@/helpers/messager'
import { transmit } from '@/helpers/pinger'
import {
   Divider,
   IconButton,
   Input,
   List,
   ListItem,
   ListItemText,
   Menu,
   MenuItem,
   Stack,
   Tooltip,
} from '@mui/material'
import { JSX } from 'react'
import { FaImage, FaPhone, FaPlus } from 'react-icons/fa'
import { IoClose, IoText } from 'react-icons/io5'
import { MdAlternateEmail, MdLink, MdLinkOff } from 'react-icons/md'
import { PiBracketsCurly } from 'react-icons/pi'
import EmptyMessage from './EmptyMsg'

interface FieldList {
   bytes: FieldByte[]
   onFieldAdd: (type: FieldTypes) => void
   onFieldUpdate: (field: FieldByte) => void
   onFieldDelete: (id: number) => void
}

export default function FieldList(props: FieldList) {
   const { bytes, onFieldAdd, onFieldUpdate, onFieldDelete } = props

   const [anchor, setAnchor] = useState<HTMLElement | null>(null)
   const fields: FieldTypes[] = ['TEXT', 'EMAIL', 'PHONE', 'IMAGE', 'LINK']

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

            <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
               <FaPlus color="aliceblue" />
            </IconButton>
         </Stack>

         <Menu
            open={anchor !== null}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
         >
            {fields.map((field) => (
               <MenuItem
                  key={field}
                  sx={{ textTransform: 'capitalize' }}
                  onClick={() => onFieldAdd(field as FieldTypes)}
               >
                  {field.toLowerCase()}
               </MenuItem>
            ))}
         </Menu>

         <Divider
            orientation="horizontal"
            sx={{
               height: 2,
               width: '88%',
               background: 'radial-gradient(aliceblue, transparent)',
            }}
         />

         {bytes.length === 0 ? (
            <EmptyMessage msg="No fields found!" />
         ) : (
            <List sx={{ overflow: 'hidden auto', width: '84%', height: '54%' }}>
               {bytes.map((byte) => (
                  <Field
                     key={byte.id}
                     data={byte}
                     onDelete={onFieldDelete}
                     onUpdate={(prop, val) => {
                        const newField = {
                           ...byte,
                           [prop]: val,
                        }

                        onFieldUpdate(newField)
                     }}
                  />
               ))}
            </List>
         )}
      </Stack>
   )
}

interface Field {
   data: FieldByte
   onDelete: (id: number) => void
   onUpdate: (prop: keyof FieldByte, data: string) => void
}

function Field({ data, onDelete, onUpdate }: Field) {
   const { name, selector, type, id } = data

   const icons: Record<FieldTypes, JSX.Element> = {
      TEXT: <IoText />,
      EMAIL: <MdAlternateEmail />,
      PHONE: <FaPhone />,
      LINK: <PiBracketsCurly />,
      IMAGE: <FaImage />,
   }

   async function handlePick() {
      const [tab] = await browser.tabs.query({
         active: true,
         currentWindow: false,
      })

      if (tab.id) {
         transmit({ message: 'selection ongoing' })

         try {
            const response = await sendToContentJS<string>(tab.id, {
               message: 'select an element',
            })

            onUpdate('selector', response)

            transmit({ message: 'selection done' })
            sendToBackground({ message: 'window return' })
         } catch {
            console.log('error')
         }
      }
   }

   return (
      <ListItem disablePadding sx={{ gap: 1, fontSize: 'large' }}>
         {icons[type]}

         <ListItemText>
            <Input
               placeholder="Enter a name"
               value={name}
               disableUnderline
               sx={{
                  width: '80%',
                  color: 'aliceblue',
                  fontSize: 14,
               }}
               onChange={(e) => onUpdate('name', e.target.value)}
            />
         </ListItemText>

         <Tooltip title={selector}>
            <IconButton size="small" onClick={handlePick}>
               {selector ? (
                  <MdLink color="aliceblue" />
               ) : (
                  <MdLinkOff color="aliceblue" />
               )}
            </IconButton>
         </Tooltip>

         <IconButton size="small" onClick={() => onDelete(id)}>
            <IoClose color="aliceblue" />
         </IconButton>
      </ListItem>
   )
}
