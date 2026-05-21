import { List, Menu, type MenuProps } from '@mui/material'

export default function FieldMenu(props: MenuProps) {
   return (
      <Menu {...props}>
         <List sx={{ minWidth: 200 }}>{props.children}</List>
      </Menu>
   )
}
