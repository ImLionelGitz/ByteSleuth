import { Button, Divider, Stack } from '@mui/material'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

type colorData = {
   title: string
   color: string
}

export default function Settings() {
   return (
      <Stack direction="column" gap={1}>
         <Stack direction="row" gap={1}>
            <Link
               to="/"
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'aliceblue',
                  fontSize: 24,
               }}
            >
               <IoMdArrowRoundBack color="aliceblue" />
            </Link>

            <h1>Settings</h1>
         </Stack>

         <Divider sx={{ background: 'aliceblue' }} />

         <Stack gap={2}>
            <ColorPicker title="Background Color" color="aliceblue" />
            <ColorPicker title="Foreground Color" color="aliceblue" />
            <ColorPicker title="Highlight Color" color="aliceblue" />
            <ColorPicker title="Rejection Color" color="aliceblue" />
            <ColorPicker title="Text Color" color="aliceblue" />
         </Stack>

         <Stack
            direction="row"
            sx={{ justifyContent: 'space-around', marginTop: '8%' }}
         >
            <Button variant="contained" sx={{ fontFamily: 'Bubbly' }}>
               Save Changes
            </Button>

            <Button
               variant="contained"
               color="secondary"
               sx={{ fontFamily: 'Bubbly' }}
            >
               Reset
            </Button>
         </Stack>
      </Stack>
   )
}

function ColorPicker({ title, color }: colorData) {
   return (
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
         <h3>{title}</h3>
         <Button sx={{ background: color, minWidth: 24 }}></Button>
      </Stack>
   )
}
