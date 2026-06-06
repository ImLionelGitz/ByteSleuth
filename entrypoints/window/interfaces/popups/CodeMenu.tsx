import { SCRAPER_LOGIC } from '@/helpers/vars'
import { Menu, MenuProps } from '@mui/material'
import { MenuItemData, nestedMenuItemsFromObject } from 'mui-nested-menu'
import { FaCheck } from 'react-icons/fa'

interface CodeMenuProps extends MenuProps {
   fields: FieldByte[]
   scripts: Script[]
   linkedIds: number[]
   curID: number
   itemSelect: (id: number) => void
   ctxAction: (action: CtxAction) => void
}

function generateMenu(props: CodeMenuProps) {
   const items: CtxAction[] = ['COPY', 'CUT', 'PASTE', 'FORMAT']

   if (props.curID === SCRAPER_LOGIC) items.push('RESET')
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

      if (item === 'LINK' && props.fields.length > 0) {
         data.items = props.fields.map((field) => {
            const linkData: MenuItemData = {
               label: field.name,

               rightIcon: props.linkedIds.includes(field.id) ? (
                  <FaCheck />
               ) : null,

               disabled: props.scripts.some(
                  (s) => s.id === field.id && s.id !== props.curID
               ),

               callback() {
                  props.itemSelect(field.id)
               },
            }

            return linkData
         })
      } else if (item !== 'LINK') {
         data.callback = () => props.ctxAction(item)
      }

      return data
   })
}

export default function CodeMenu(props: CodeMenuProps) {
   return (
      <Menu {...props} slotProps={{ paper: { sx: { width: 200 } } }}>
         {nestedMenuItemsFromObject({
            menuItemsData: generateMenu(props),
            isOpen: true,
            handleClose: () => {},
         })}
      </Menu>
   )
}
