import { SETTING_BTN_SIZE } from '@/helpers/vars'
import { Button, Stack } from '@mui/material'
import { MdOpenInBrowser } from 'react-icons/md'

export default function ScrapeSetting({ onClick }: { onClick: () => void }) {
   return (
      <Stack
         direction="row"
         sx={{
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-evenly',
         }}
      >
         <strong style={{ textTransform: 'capitalize' }}>
            Change scraper behaivor
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
            onClick={onClick}
         >
            <MdOpenInBrowser />
         </Button>
      </Stack>
   )
}
