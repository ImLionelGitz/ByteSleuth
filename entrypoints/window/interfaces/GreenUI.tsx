import GreenUI from '@/assets/GreenBox.png'
import { Box } from '@mui/material'
import FieldList from '../components/FieldList'

const ORG_Size = 240

export default function TableFieldUI({ scale }: { scale?: number }) {
   const width = ORG_Size * (scale || 1)
   const height = ORG_Size * (scale || 1)

   const [fieldUI, setField] = useState<FieldByte[]>([])

   function handleFieldAdd(type: FieldTypes) {
      setField((old) => {
         const newField: FieldByte = {
            id: old.length,
            type: type,
            name: 'New Field',
            selector: '',
         }

         return [...old, newField]
      })
   }

   function handleFieldUpdate(newField: FieldByte) {
      setField((old) =>
         old.map((oldField) => {
            if (oldField.id === newField.id) {
               return newField
            }

            return oldField
         })
      )

      console.log(fieldUI)
   }

   function handleFieldDelete(id: number) {
      setField((old) => {
         const raw = old.filter((oldField) => oldField.id !== id)
         return raw.map((field, i) => ({ ...field, id: i }))
      })
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

         <FieldList
            bytes={fieldUI}
            onFieldAdd={handleFieldAdd}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleFieldDelete}
         />
      </Box>
   )
}
