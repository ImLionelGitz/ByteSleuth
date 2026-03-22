import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'

interface SplitButton {
   options: string[]
}

export default function SplitButton({ options }: SplitButton) {
   const [open, setOpen] = useState(false)
   const anchorRef = useRef<HTMLDivElement>(null)
   const [selectedIndex, setSelectedIndex] = useState(1)

   const handleClick = () => {
      console.info(`You clicked ${options[selectedIndex]}`)
   }

   const handleMenuItemClick = (
      _: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number
   ) => {
      setSelectedIndex(index)
      setOpen(false)
   }

   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen)
   }

   const handleClose = (event: Event) => {
      if (
         anchorRef.current &&
         anchorRef.current.contains(event.target as HTMLElement)
      ) {
         return
      }

      setOpen(false)
   }

   return (
      <>
         <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="Button group with a nested menu"
         >
            <Button
               onClick={handleClick}
               sx={{ fontFamily: 'Bubbly', fontWeight: 900 }}
            >
               {`Download as ${options[selectedIndex].toUpperCase()}`}
            </Button>
            <Button
               size="small"
               aria-controls={open ? 'split-button-menu' : undefined}
               aria-expanded={open ? 'true' : undefined}
               aria-label="select merge strategy"
               aria-haspopup="menu"
               onClick={handleToggle}
            >
               <FaCaretDown fontSize="20px" />
            </Button>
         </ButtonGroup>
         <Popper
            sx={{ zIndex: 1 }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
         >
            {({ TransitionProps, placement }) => (
               <Grow
                  {...TransitionProps}
                  style={{
                     transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
               >
                  <Paper>
                     <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                           {options.map((option, index) => (
                              <MenuItem
                                 key={option}
                                 sx={{ fontFamily: 'Bubbly' }}
                                 selected={index === selectedIndex}
                                 onClick={(event) =>
                                    handleMenuItemClick(event, index)
                                 }
                              >
                                 {option.toUpperCase()}
                              </MenuItem>
                           ))}
                        </MenuList>
                     </ClickAwayListener>
                  </Paper>
               </Grow>
            )}
         </Popper>
      </>
   )
}
