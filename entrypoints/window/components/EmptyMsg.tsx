import { Stack } from '@mui/material'
import { IoSad } from 'react-icons/io5'

export default function EmptyMessage({ msg }: { msg: string }) {
   return (
      <Stack
         sx={{
            color: 'aliceblue',
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 'xx-large',
            gap: 1.4,
         }}
      >
         <IoSad />

         <p className="text-[14px]">{msg}</p>
      </Stack>
   )
}
