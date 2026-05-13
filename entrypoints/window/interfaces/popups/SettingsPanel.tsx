import { Button, Divider, Paper, Stack } from '@mui/material'
import { useColor } from 'react-color-palette'
import tiny from 'tinycolor2'

type colorData = {
   color: string
   onClick: (anchor: HTMLElement) => void
}

export default function SettingsPanel() {
   const [color] = useColor('#dbdbdb')

   return (
      <Paper
         sx={({ palette }) => ({
            padding: 2,
            maxWidth: 310,
            backgroundColor: palette.primary.main,
         })}
      >
         <Stack sx={{ textAlign: 'center', gap: 1 }}>
            <h2>Settings</h2>

            <Divider sx={{ backgroundColor: 'aliceblue' }} />

            <Stack sx={{ marginTop: 0.8, gap: 1 }}>
               <ColorSetting color={color.hex} onClick={() => {}} />
               <ScrapeSysEdit />
            </Stack>
         </Stack>

         {/* <Popover
            open
            slotProps={{
               paper: { sx: { borderRadius: '12px' } },
            }}
         >
            <ColorPicker
               hideInput={['rgb', 'hsv']}
               hideAlpha
               color={color}
               onChange={() => {}}
               onChangeComplete={() => {}}
            />
         </Popover> */}
      </Paper>
   )
}

function ColorSetting({ color, onClick }: colorData) {
   const modifier = useMemo(() => tiny(color), [])

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
               width: 24,
               height: 24,
               border: `2px solid ${modifier.darken(15)}`,
            }}
            onClick={(e) => onClick(e.currentTarget)}
         ></Button>
      </Stack>
   )
}

function ScrapeSysEdit() {
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
            sx={{ minWidth: 0, fontSize: 10, fontFamily: 'Inter' }}
         >
            Open Editor
         </Button>
      </Stack>
   )
}
