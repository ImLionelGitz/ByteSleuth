import { SETTING_BTN_SIZE } from '@/helpers/vars'
import { Button, Stack } from '@mui/material'
import { MdOpenInBrowser } from 'react-icons/md'

interface RowContainerSetting {
   onEditClick: () => void
}

export default function RowContainerSetting(props: RowContainerSetting) {
   return (
      <Stack
         direction="row"
         sx={{
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
         }}
      >
         <strong style={{ textTransform: 'capitalize' }}>
            Add a row container
         </strong>

         <Button
            size="small"
            variant="contained"
            color="secondary"
            disableElevation
            sx={{
               minWidth: 0,
               fontSize: 18,
               fontFamily: 'Inter',
               padding: 0,
               width: SETTING_BTN_SIZE,
               height: SETTING_BTN_SIZE,
            }}
            onClick={props.onEditClick}
         >
            <MdOpenInBrowser />
         </Button>
      </Stack>
   )
}
