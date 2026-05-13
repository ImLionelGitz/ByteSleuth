import { Button } from '@mui/material'
import { MenuItemData, NestedDropdown } from 'mui-nested-menu'
import { FaPlus } from 'react-icons/fa'

// interface AddMenuProps extends MenuProps {
//    context: ''
// }

export default function AddMenu() {
   const menuData: MenuItemData = {
      label: 'Add',
      items: [
         {
            label: 'Software',
            callback: (e, item) => console.log('Software clicked', item),
            items: [
               { label: 'SaaS Tools', callback: () => console.log('SaaS') },
               { label: 'Mobile Apps', callback: () => console.log('Mobile') },
            ],
         },
         {
            label: 'Hardware',
            items: [
               { label: 'Laptops', callback: () => console.log('Laptops') },
               { label: 'Monitors', callback: () => console.log('Monitors') },
            ],
         },
      ],
   }

   return (
      <Button>
         <NestedDropdown
            menuItemsData={menuData}
            ButtonProps={{
               variant: 'contained',
               startIcon: <FaPlus />,
               endIcon: <></>,
               sx: {
                  fontFamily: 'Space-Grotesk',
                  textTransform: 'capitalize',
                  minWidth: 0,
               },
            }}
         />
      </Button>
   )
}
