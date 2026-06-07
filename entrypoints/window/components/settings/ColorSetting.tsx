import { SETTING_BTN_SIZE } from '@/helpers/vars'
import { Button } from '@mui/material'
import { useMemo } from 'react'
import tiny from 'tinycolor2'
import SettingSlot from './SettingSlot'

type colorData = {
   color: string
   onClick: (anchor: HTMLElement) => void
}

export default function ColorSetting({ color, onClick }: colorData) {
   const modifier = useMemo(() => tiny(color), [color])

   return (
      <SettingSlot title="Selection highlight">
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
      </SettingSlot>
   )
}
