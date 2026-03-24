import { UniversalPad } from '@/Vars'
import { Button, Divider, Popover, Stack, useTheme } from '@mui/material'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useThemeUpdate } from '../hooks/useThemeUpdate'
import tiny from 'tinycolor2'
import { useMemo, useState } from 'react'
import { ColorPicker, ColorService, useColor } from 'react-color-palette'

type colorData = {
   title: string
   color: string
   onClick: (anchor: HTMLElement) => void
}

export default function Settings() {
   const { palette } = useTheme()
   const { theme, setTheme, resetTheme } = useThemeUpdate()

   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
   const [curSetting, setSetting] = useState('')
   const [curColor, setColor] = useColor('#000')

   return (
      <Stack direction="column" gap={1} padding={UniversalPad}>
         <Stack direction="row" gap={1.4}>
            <Button variant="contained" sx={{ minWidth: 0, padding: 0 }}>
               <Link
                  to="/"
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     color: palette.text.primary,
                     fontSize: 24,
                     padding: 6,
                  }}
               >
                  <IoMdArrowRoundBack color={palette.text.primary} />
               </Link>
            </Button>

            <h1>Settings</h1>
         </Stack>

         <Divider sx={{ background: palette.text.primary }} />

         <Stack gap={2}>
            {Object.keys(theme)
               .sort()
               .map((key) => (
                  <ColorSetting
                     key={key}
                     title={key.split('_').join(' ')}
                     color={(theme as Record<string, string>)[key]}
                     onClick={(el) => {
                        const daColor = ColorService.convert(
                           'hex',
                           (theme as Record<string, string>)[key]
                        )

                        setColor(daColor)
                        setSetting(key)
                        setAnchorEl(el)
                     }}
                  />
               ))}
         </Stack>

         <Popover
            open={anchorEl !== null && curSetting !== null}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onClose={() => {
               setAnchorEl(null)
               setSetting('')
            }}
            slotProps={{
               paper: { sx: { borderRadius: '12px' } },
            }}
         >
            <ColorPicker
               hideInput={['rgb', 'hsv']}
               hideAlpha
               color={curColor}
               onChange={setColor}
               onChangeComplete={(c) => {
                  setTheme(curSetting, c.hex)
               }}
            />
         </Popover>

         <Stack direction="row" marginTop="8%" justifyContent="center">
            <Button
               variant="contained"
               color="secondary"
               sx={{ fontFamily: 'Bubbly' }}
               onClick={resetTheme}
            >
               Reset
            </Button>
         </Stack>
      </Stack>
   )
}

function ColorSetting({ title, color, onClick }: colorData) {
   const modifier = useMemo(() => tiny(color), [])

   return (
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
         <h3 style={{ textTransform: 'capitalize' }}>{title}</h3>

         <Button
            sx={{
               background: color,
               minWidth: 24,
               border: `2px solid ${modifier.darken(15)}`,
            }}
            onClick={(e) => onClick(e.currentTarget)}
         ></Button>
      </Stack>
   )
}
