import { Menu, MenuProps } from '@mui/material'
import { MenuItemData, nestedMenuItemsFromObject } from 'mui-nested-menu'
import { FaCheck } from 'react-icons/fa'

function generateMenu(
   fields: FieldByte[],
   linked: number[],
   onSelect: (id: number) => void,
   onCtxAction: (action: CtxAction) => void
) {
   const items: CtxAction[] = ['COPY', 'CUT', 'PASTE', 'FORMAT', 'LINK']

   return items.map((item) => {
      const caps = (() => {
         switch (item) {
            case 'COPY':
            case 'CUT':
            case 'PASTE':
               return item.substring(0, 1) + item.substring(1).toLowerCase()
            case 'FORMAT':
               return 'Format Code'
            case 'LINK':
               return 'Link to Fields'
         }
      })()

      const data: MenuItemData = {
         label: caps,
         uid: item,
      }

      if (item === 'LINK' && fields.length > 0) {
         data.items = fields.map((field) => {
            const data: MenuItemData = {
               label: field.name,
               rightIcon: linked.includes(field.id) ? <FaCheck /> : null,
               callback() {
                  onSelect(field.id)
               },
            }

            return data
         })
      } else if (item !== 'LINK') {
         data.callback = () => onCtxAction(item)
      }

      return data
   })
}

interface CodeMenuProps extends MenuProps {
   fields: FieldByte[]
   linkedIds: number[]
   itemSelect: (id: number) => void
   ctxAction: (action: CtxAction) => void
}

export default function CodeMenu(props: CodeMenuProps) {
   return (
      <Menu {...props} slotProps={{ paper: { sx: { width: 200 } } }}>
         {nestedMenuItemsFromObject({
            menuItemsData: generateMenu(
               props.fields,
               props.linkedIds,
               props.itemSelect,
               props.ctxAction
            ),
            isOpen: true,
            handleClose: () => {},
         })}
      </Menu>
   )
}
