import { SETTING_BTN_SIZE } from '@/helpers/vars'
import { Button } from '@mui/material'
import { MdOpenInBrowser } from 'react-icons/md'
import SettingSlot from './SettingSlot'

export default function ScrapeSetting({ onClick }: { onClick: () => void }) {
   return (
      <SettingSlot title="Scraper behavior">
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
            onClick={onClick}
         >
            <MdOpenInBrowser />
         </Button>
      </SettingSlot>
   )
}
