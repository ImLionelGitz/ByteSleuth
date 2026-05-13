import { Checkbox, List, ListItem, Menu, type MenuProps } from '@mui/material'

export default function FieldMenu(props: MenuProps) {
   return (
      <Menu {...props}>
         <List sx={{ minWidth: 200 }}>
            {new Array(5).fill(0).map((_, i) => (
               <ListItem
                  key={i}
                  secondaryAction={<Checkbox />}
                  sx={{ fontSize: 15, fontFamily: 'Inter' }}
               >
                  {'lololol'}
               </ListItem>
            ))}
         </List>
      </Menu>
   )
}
