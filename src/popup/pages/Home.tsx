import NumberSpinner from '@/popup/components/NumberInput'
import Table from '@/popup/components/Table'
import {
   Button,
   Divider,
   IconButton,
   Paper,
   Stack,
   Switch,
} from '@mui/material'
import { FaMinus, FaPlay, FaPlus } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function Home() {
   return (
      <Stack direction="column" gap={1}>
         <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <h1>BitSleuth</h1>

            <Stack direction="row" gap={2}>
               <Button color="primary" variant="contained">
                  <FaPlay />
               </Button>

               <Link
                  to="/settings"
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     color: 'aliceblue',
                     fontSize: 24,
                  }}
               >
                  <FaGear />
               </Link>
            </Stack>
         </Stack>

         <Divider sx={{ background: 'aliceblue' }} />

         <Stack direction="column">
            <Stack
               direction="row"
               sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
               <h3>Create a Table</h3>

               <Stack direction="row">
                  <IconButton color="primary" disableRipple>
                     <FaPlus />
                  </IconButton>

                  <IconButton color="secondary" disableRipple>
                     <FaMinus />
                  </IconButton>
               </Stack>
            </Stack>

            <Paper sx={{ height: 125, marginBottom: 1 }}>
               <Table />
            </Paper>
         </Stack>

         <Stack gap={3}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
               <h3>Multi-page Lookup</h3>
               <Switch />
            </Stack>

            <Stack
               direction="row"
               justifyContent="space-between"
               alignItems="flex-end"
            >
               <Stack sx={{ alignItems: 'center' }} gap={1}>
                  <h4>Max pages</h4>

                  <NumberSpinner
                     min={0}
                     max={999}
                     defaultValue={0}
                     size="small"
                  />
               </Stack>

               <Button
                  variant="contained"
                  sx={{
                     fontFamily: 'Bubbly',
                     fontSize: 12,
                     fontWeight: '900',
                  }}
               >
                  Pick the next btn
               </Button>
            </Stack>
         </Stack>
      </Stack>
   )
}
