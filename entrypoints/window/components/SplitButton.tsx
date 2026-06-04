import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import * as React from 'react'
import { TiArrowSortedDown, TiExport } from 'react-icons/ti'

interface SplitButton {
   onClick: (t: ExportOptions) => void
}

const options: ExportOptions[] = [
   'JSON',
   'CSV',
   'XLSX',
   'Copy to JSON',
   'Copy to CSV',
]

export default function SplitButton({ onClick }: SplitButton) {
   const [open, setOpen] = React.useState(false)
   const anchorRef = React.useRef<HTMLDivElement>(null)
   const [selectedIndex, setSelectedIndex] = React.useState(1)

   const currentText = useMemo(() => {
      return options[selectedIndex]
   }, [selectedIndex])

   const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
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
         <ButtonGroup ref={anchorRef} variant="contained">
            <Button
               size="small"
               disableElevation
               sx={{
                  fontFamily: 'Inter',
                  textTransform: 'capitalize',
                  gap: 0.5,
               }}
               onClick={() => onClick(currentText)}
            >
               <TiExport fontSize={14} />
               {selectedIndex >= 3 ? currentText : `export to ${currentText}`}
            </Button>
            <Button
               size="small"
               aria-controls={open ? 'split-button-menu' : undefined}
               aria-expanded={open ? 'true' : undefined}
               aria-label="select merge strategy"
               aria-haspopup="menu"
               onClick={handleToggle}
            >
               <TiArrowSortedDown fontSize={18} />
            </Button>
         </ButtonGroup>
         <Popper
            sx={{ zIndex: 9999 }}
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
                                 selected={index === selectedIndex}
                                 onClick={(event) =>
                                    handleMenuItemClick(event, index)
                                 }
                              >
                                 {option}
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
