import GreenUI from '@/assets/GreenBox.png'
import { Box } from '@mui/material'
import FieldList from '../components/FieldList'

const ORG_Size = 240

interface TableFieldUI {
   scale?: number
   fieldList: FieldByte[]
   fieldAdd: (type: FieldTypes) => void
   fieldUpdate: (field: FieldByte) => void
   fieldDelete: (id: number) => void
}

export default function TableFieldUI(props: TableFieldUI) {
   const { scale, fieldList, fieldAdd, fieldDelete, fieldUpdate } = props

   const width = ORG_Size * (scale || 1)
   const height = ORG_Size * (scale || 1)

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
            bytes={fieldList}
            onFieldAdd={fieldAdd}
            onFieldUpdate={fieldUpdate}
            onFieldDelete={fieldDelete}
         />
      </Box>
   )
}
