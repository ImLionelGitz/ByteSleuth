import { SETTING_BTN_SIZE } from '@/helpers/vars'
import { Button, Stack } from '@mui/material'
import tiny from 'tinycolor2'

type colorData = {
   color: string
   onClick: (anchor: HTMLElement) => void
}

export default function ColorSetting({ color, onClick }: colorData) {
   const modifier = useMemo(() => tiny(color), [color])

   return (
      <Stack
         direction="row"
         sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between' }}
      >
         <strong style={{ textTransform: 'capitalize' }}>
            Change highlight color
         </strong>

         <Button
            sx={{
               background: color,
               minWidth: 0,
               width: SETTING_BTN_SIZE,
               height: SETTING_BTN_SIZE,
               border: `2px solid ${modifier.darken(4)}`,
            }}
            onClick={(e) => onClick(e.currentTarget)}
         ></Button>
      </Stack>
   )
}
