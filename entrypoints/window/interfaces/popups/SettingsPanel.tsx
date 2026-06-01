import {
   getDefaultUserData,
   getUserData,
   saveUserData,
} from '@/helpers/datastores/userDatabase'
import { Divider, Paper, Popover, Stack } from '@mui/material'
import { ColorPicker, ColorService, useColor } from 'react-color-palette'
import {
   ColorSetting,
   RowContainerSetting,
   ScrapeSetting,
} from '@/entrypoints/window/components/settings'
import { ROW_CONT_LOGIC, SCRAPER_LOGIC } from '@/helpers/vars'
import { transmit } from '@/helpers/pinger'

interface SettingsPanel {
   fields: FieldByte[]
   openEditor: (id: number) => void
}

export default function SettingsPanel({ fields, openEditor }: SettingsPanel) {
   const [color, setColor] = useColor(getDefaultUserData().color)
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
   const rowField = useMemo(
      () => fields.find((f) => f.id === ROW_CONT_LOGIC),
      [fields]
   )

   const handlePopClose = () => {
      saveUserData('color', color.hex)
      setAnchorEl(null)
   }

   const handleSampling = () => {
      if (!rowField) return

      console.log(rowField)
      transmit({
         message: 'sample row container',
         rowField: rowField,
      })
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

               <ScrapeSetting onClick={() => openEditor(SCRAPER_LOGIC)} />

               {rowField && (
                  <RowContainerSetting
                     myField={rowField}
                     onEditClick={() => openEditor(ROW_CONT_LOGIC)}
                     onSample={handleSampling}
                  />
               )}
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
