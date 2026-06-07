import { SETTING_BTN_SIZE } from '@/helpers/vars'
import { Button } from '@mui/material'
import { MdOpenInBrowser } from 'react-icons/md'
import SettingSlot from './SettingSlot'

interface RowContainerSetting {
   onEditClick: () => void
}

export default function RowContainerSetting(props: RowContainerSetting) {
   return (
      <SettingSlot title="Row architecture">
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
      </SettingSlot>
   )
}
