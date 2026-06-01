import { SCRAPER_LOGIC } from '@/helpers/vars'
import { Menu, MenuProps } from '@mui/material'
import { MenuItemData, nestedMenuItemsFromObject } from 'mui-nested-menu'
import { FaCheck } from 'react-icons/fa'

function generateMenu(
   fields: FieldByte[],
   linked: number[],
   idOfCtx: number,
   onSelect: (id: number) => void,
   onCtxAction: (action: CtxAction) => void
) {
   const items: CtxAction[] = ['COPY', 'CUT', 'PASTE', 'FORMAT']

   if (idOfCtx === SCRAPER_LOGIC) items.push('RESET')
   else items.push('LINK')

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
            case 'RESET':
               return 'Reset Code'
            default:
               return ''
         }
      })()

      const data: MenuItemData = {
         label: caps,
         uid: item,
      }

      if (item === 'LINK' && fields.length > 0) {
         data.items = fields.map((field) => {
            const linkData: MenuItemData = {
               label: field.name,
               rightIcon: linked.includes(field.id) ? <FaCheck /> : null,
               callback() {
                  onSelect(field.id)
               },
            }

            return linkData
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
   curID: number
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
               props.curID,
               props.itemSelect,
               props.ctxAction
            ),
            isOpen: true,
            handleClose: () => {},
         })}
      </Menu>
   )
}
