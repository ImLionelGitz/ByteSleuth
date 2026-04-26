import GreenUI from '@/assets/GreenBox.png'
import { Box } from '@mui/material'
import FieldList from '../components/FieldList'

const ORG_Size = 240

export default function TableFieldUI({ scale }: { scale?: number }) {
   const width = ORG_Size * (scale || 1)
   const height = ORG_Size * (scale || 1)

   const [fieldUI, setFieldUI] = useState<SleuthInfo>({
      main_selector: '',
      fields: [],
   })

   async function handleBasePick() {
      const [tab] = await browser.tabs.query({
         active: true,
         currentWindow: false,
      })

      if (tab.id) {
         const msg: Messages = { message: 'select a root' }
         browser.tabs.sendMessage(tab.id, msg)
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
