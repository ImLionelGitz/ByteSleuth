import { Stack } from '@mui/material'
import { IoSad } from 'react-icons/io5'

export default function Table() {
   return (
      <Stack
         sx={{ textAlign: 'center', justifyContent: 'center', height: '100%' }}
      >
         <h3 style={{ fontWeight: 100 }}>
            <span>
               <IoSad fontSize={25} />
            </span>
            <br />
            No entries defined
         </h3>
      </Stack>
   )
}
