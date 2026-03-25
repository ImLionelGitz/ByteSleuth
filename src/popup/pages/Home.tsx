import NumberSpinner from '@/popup/components/NumberInput'
import {
   Button,
   Divider,
   IconButton,
   Paper,
   Stack,
   Switch,
   useTheme,
} from '@mui/material'
import { FaPlay, FaPlus } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import EntryEditor from '../components/EntryEditor'
import { HIDE_CONTENT } from '@/Messages'
import { useEffect, useState } from 'react'
import { EntryBit } from '@/Types'
import { TableFields, UniversalPad } from '@/Vars'
import Empty from '../components/Empty'
import sendRequest from '../helpers/messager'

export default function Home() {
   const [entries, setEntry] = useState<EntryBit[]>([])
   const [pageLook, toggleLookup] = useState(false)
   const { palette } = useTheme()

   const addEntry = () => {
      setEntry((old) => {
         const newArr: EntryBit[] = [
            ...old,
            {
               id: old.length,
               name: 'Unnamed Field',
               selector: '',
            },
         ]

         chrome.storage.local.set({ [TableFields]: newArr })
         return newArr
      })
   }

   useEffect(() => {
      chrome.storage.local.get(
         TableFields,
         (res: Record<string, EntryBit[]>) => {
            setEntry(res[TableFields] || [])
         }
      )
   }, [])

   return (
      <Stack direction="column" gap={1} padding={UniversalPad}>
         <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Stack>
               <h3 style={{ fontSize: '10px', fontWeight: '100' }}>
                  {`v${chrome.runtime.getVersion()}`}
               </h3>

               <h1>BitSleuth</h1>
            </Stack>

            <Stack direction="row" gap={2}>
               <Button
                  color="primary"
                  variant="contained"
                  sx={{ fontSize: 21 }}
                  onClick={() => sendRequest(HIDE_CONTENT)}
               >
                  <FaPlay />
               </Button>

               <Link
                  to="/settings"
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     color: palette.text.primary,
                     fontSize: 24,
                  }}
               >
                  <FaGear />
               </Link>
            </Stack>
         </Stack>

         <Divider sx={{ background: palette.text.primary }} />

         <Stack direction="column">
            <Stack
               direction="row"
               sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
               <h3>Define Table Fields</h3>

               <IconButton color="primary" disableRipple onClick={addEntry}>
                  <FaPlus />
               </IconButton>
            </Stack>

            <Paper
               sx={{
                  height: 200,
                  marginBottom: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  background: palette.error.main,
               }}
            >
               {entries.length > 0 ? (
                  <EntryEditor
                     allEntries={entries}
                     entryChanged={(newEntry) => {
                        setEntry((list) => {
                           const newList = list.map((entry) =>
                              entry.id === newEntry.id ? newEntry : entry
                           )

                           chrome.storage.local.set({ [TableFields]: newList })
                           return newList
                        })
                     }}
                     entryRemoval={(discarded) => {
                        setEntry((list) => {
                           const newList = list
                              .filter((entry) => entry.id !== discarded.id)
                              .map((e, i) => ({ ...e, id: i }))

                           chrome.storage.local.set({ [TableFields]: newList })
                           return newList
                        })
                     }}
                  />
               ) : (
                  <Empty />
               )}
            </Paper>
         </Stack>

         <Stack gap={3}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
               <h3>Multi-page Lookup</h3>
               <Switch
                  value={pageLook}
                  onChange={(_, checked) => {
                     toggleLookup(checked)
                  }}
               />
            </Stack>

            <Stack
               direction="row"
               justifyContent="space-between"
               alignItems="flex-end" // 60px
               sx={{
                  overflow: 'hidden',
                  transition: 'height 0.2s ease',
                  height: pageLook ? 63 : 0,
               }}
            >
               <Stack sx={{ alignItems: 'center' }} gap={1}>
                  <h4>Max pages</h4>

                  <NumberSpinner
                     min={0}
                     max={999}
                     defaultValue={0}
                     size="small"
                     disabled={!pageLook}
                  />
               </Stack>

               <Button
                  variant="contained"
                  disabled={!pageLook}
                  sx={{
                     fontFamily: 'Bubbly',
                     fontSize: 12,
                     fontWeight: '900',
                  }}
                  onClick={() => {
                     chrome.windows.create({
                        url: chrome.runtime.getURL('src/popup/result.html'),
                        type: 'popup',
                        width: 800,
                        height: 600,
                     })
                  }}
               >
                  Pick the next btn
               </Button>
            </Stack>
         </Stack>
      </Stack>
   )
}
