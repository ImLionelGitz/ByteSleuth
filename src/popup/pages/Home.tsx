import NumberSpinner from '@/popup/components/NumberInput'
import { EntryBit, LocalData, MultiLookData } from '@/Types'
import { NxtFields, TableFields, UniversalPad } from '@/Vars'
import {
   Button,
   Divider,
   IconButton,
   Paper,
   Stack,
   Switch,
   useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { FaPlay, FaPlus } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Empty from '../components/Empty'
import EntryEditor from '../components/EntryEditor'

export default function Home() {
   const [entries, setEntry] = useState<EntryBit[]>([])
   const [multiPg, setMultiPage] = useState<MultiLookData>({
      enabled: false,
      maxPages: 0,
      nextBtn: '',
   })

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

      chrome.storage.session.get(
         NxtFields,
         (res: Record<string, MultiLookData>) => {
            const data: MultiLookData = res[NxtFields] || {
               enabled: false,
               maxPages: 0,
               nextBtn: '',
            }

            setMultiPage(data)
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
                  onClick={() => {
                     const data: LocalData = {
                        type: 'START_SCRAPE',
                     }

                     window.parent.postMessage(data, '*')
                  }}
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
                  checked={multiPg.enabled}
                  onChange={(_, checked) => {
                     setMultiPage((old) => {
                        const newState = { ...old, enabled: checked }

                        chrome.storage.session.set({ [NxtFields]: newState })
                        return newState
                     })
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
                  height: multiPg.enabled ? 63 : 0,
               }}
            >
               <Stack sx={{ alignItems: 'center' }} gap={1}>
                  <h4>Max pages</h4>

                  <NumberSpinner
                     min={0}
                     max={999}
                     value={multiPg.maxPages}
                     size="small"
                     disabled={!multiPg.enabled}
                     onValueChange={(val) => {
                        setMultiPage((old) => {
                           const newState = { ...old, maxPages: val! }

                           chrome.storage.session.set({ [NxtFields]: newState })
                           return newState
                        })
                     }}
                  />
               </Stack>

               <Button
                  variant="contained"
                  disabled={!multiPg.enabled}
                  color={multiPg.nextBtn ? 'secondary' : 'primary'}
                  sx={{
                     fontFamily: 'Bubbly',
                     fontSize: 12,
                     fontWeight: '900',
                  }}
                  onClick={() => {
                     const data: LocalData = {
                        type: 'SELECT_NXT_BTN',
                     }

                     window.parent.postMessage(data, '*')

                     // chrome.windows.create({
                     //    url: chrome.runtime.getURL('src/popup/result.html'),
                     //    type: 'popup',
                     //    width: 800,
                     //    height: 600,
                     // })
                  }}
               >
                  {multiPg.nextBtn ? 'Next button picked' : 'Pick the next btn'}
               </Button>
            </Stack>
         </Stack>
      </Stack>
   )
}
