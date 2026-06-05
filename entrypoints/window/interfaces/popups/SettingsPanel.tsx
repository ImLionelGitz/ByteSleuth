import {
   ColorSetting,
   RowContainerSetting,
   ScrapeSetting,
} from '@/entrypoints/window/components/settings'
import {
   getDefaultUserData,
   getUserData,
   saveUserData,
} from '@/helpers/datastores/userDatabase'
import { ROW_CONT_LOGIC, SCRAPER_LOGIC } from '@/helpers/vars'
import { Divider, Paper, Popover, Stack } from '@mui/material'
import { ColorPicker, ColorService, useColor } from 'react-color-palette'

interface SettingsPanel {
   openEditor: (id: number) => void
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
            borderRadius: '12px',
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

               <ScrapeSetting onClick={() => openEditor(SCRAPER_LOGIC)} />

               <RowContainerSetting
                  onEditClick={() => openEditor(ROW_CONT_LOGIC)}
               />
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
