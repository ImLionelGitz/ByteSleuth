import GreenUI from '@/assets/GreenBox.png'
import { Box } from '@mui/material'
import FieldList from '../components/FieldList'
import { sendToBackground, sendToContentJS } from '@/helpers/messager'

const ORG_Size = 240

export default function TableFieldUI({ scale }: { scale?: number }) {
   const width = ORG_Size * (scale || 1)
   const height = ORG_Size * (scale || 1)

   const [fieldUI, setField] = useState<SleuthInfo>({
      main_selector: '',
      fields: [],
   })

   async function handleBasePick() {
      const [tab] = await browser.tabs.query({
         active: true,
         currentWindow: false,
      })

      if (tab.id) {
         sendToBackground({ message: 'window minimize' })

         const msg: Messages = { message: 'select a root' }
         const response = await sendToContentJS<string>(tab.id, msg)

         setField({ main_selector: response, fields: [] })
         sendToBackground({ message: 'window return' })
      }
   }

   return (
      <Box sx={{ width: width, height: height, overflow: 'hidden' }}>
         <img
            src={GreenUI}
            style={{
               position: 'absolute',
               zIndex: -1,
               mixBlendMode: 'screen',
               width: width,
               height: height,
            }}
            alt=""
         />

         <FieldList info={fieldUI} onBaseAssign={handleBasePick} />
      </Box>
   )
}
