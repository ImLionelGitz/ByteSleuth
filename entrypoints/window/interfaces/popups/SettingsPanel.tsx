import {
   getDefaultUserData,
   getUserData,
   saveUserData,
} from '@/helpers/datastores/userDatabase'
import { Button, Divider, Paper, Popover, Stack } from '@mui/material'
import { ColorPicker, ColorService, useColor } from 'react-color-palette'
import tiny from 'tinycolor2'

type colorData = {
   color: string
   onClick: (anchor: HTMLElement) => void
}

interface SettingsPanel {
   openEditor: () => void
}

export default function SettingsPanel({ openEditor }: SettingsPanel) {
   const [color, setColor] = useColor(getDefaultUserData().color)
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

   const handlePopClose = () => {
      saveUserData('color', color.hex)
      setAnchorEl(null)
   }

   useEffect(() => {
      const fetchSettings = async () => {
         const data = await getUserData()
         setColor(ColorService.convert('hex', data.color))
      }

      fetchSettings()
   }, [])

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
               <ColorSetting
                  color={color.hex}
                  onClick={(el) => setAnchorEl(el)}
               />

               <ScrapeSysEdit onClick={openEditor} />
            </Stack>
         </Stack>

         <Popover
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={handlePopClose}
            slotProps={{
               paper: { sx: { borderRadius: '12px' } },
            }}
         >
            <ColorPicker
               hideInput={['rgb', 'hsv']}
               color={color}
               onChange={(color) => setColor(color)}
            />
         </Popover>
      </Paper>
   )
}

function ColorSetting({ color, onClick }: colorData) {
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
               width: 24,
               height: 24,
               border: `2px solid ${modifier.darken(4)}`,
            }}
            onClick={(e) => onClick(e.currentTarget)}
         ></Button>
      </Stack>
   )
}

function ScrapeSysEdit({ onClick }: { onClick: () => void }) {
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
            onClick={onClick}
         >
            Open Editor
         </Button>
      </Stack>
   )
}
