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
import { JSX, useEffect, useState } from 'react'
import { BsBagPlusFill } from 'react-icons/bs'
import { FaEye, FaPlay, FaPlus } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Empty from '../components/Empty'
import EntryEditor from '../components/EntryEditor'

interface MultiModeBtn {
   icon: JSX.Element
   onClick: () => void
}

export default function Home() {
   const [entries, setEntry] = useState<EntryBit[]>([])
   const [multiSup, setMultiData] = useState<MultiLookData>({
      enabled: false,
      collected: [],
   })

   const multiModeBtns: Record<string, MultiModeBtn> = {
      Collect: {
         icon: <BsBagPlusFill />,
         onClick: () => notifyWindow({ type: 'START_COLLECTING' }),
      },

      Results: {
         icon: <FaEye />,
         onClick: () => {
            chrome.windows.create({
               url: chrome.runtime.getURL('src/popup/result.html'),
               type: 'popup',
               width: 800,
               height: 600,
            })
         },
      },
   }

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

   const notifyWindow = (msg: LocalData) => {
      window.parent.postMessage(msg, '*')
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
               collected: [],
            }

            setMultiData(data)
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
                  disabled={multiSup.enabled}
                  sx={{ fontSize: 21 }}
                  onClick={() => notifyWindow({ type: 'START_SCRAPE' })}
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

               <IconButton
                  color="primary"
                  disableRipple
                  onClick={addEntry}
                  disabled={multiSup.enabled}
               >
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
                     entryBtnClicks={multiSup.enabled}
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
                  <Empty text="No entries defined" />
               )}
            </Paper>
         </Stack>

         <Stack gap={3}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
               <h3>Multiple pages?</h3>

               <Switch
                  checked={multiSup.enabled}
                  onChange={(_, checked) => {
                     setMultiData((old) => {
                        const newState = { ...old, enabled: checked }

                        chrome.storage.session.set({ [NxtFields]: newState })
                        return newState
                     })
                  }}
               />
            </Stack>

            <Stack
               direction="row"
               justifyContent="space-evenly"
               alignItems="flex-end"
               overflow="hidden"
               height={multiSup.enabled ? 40 : 0}
               sx={{
                  transition: 'height 0.2s ease',
               }}
            >
               {Object.keys(multiModeBtns).map((key) => (
                  <Button
                     key={key}
                     variant="contained"
                     disabled={!multiSup.enabled}
                     sx={{
                        fontFamily: 'Bubbly',
                        fontSize: 12,
                        fontWeight: '900',
                        gap: 0.5,
                     }}
                     onClick={multiModeBtns[key].onClick}
                  >
                     {multiModeBtns[key].icon}
                     {key}
                  </Button>
               ))}
            </Stack>
         </Stack>
      </Stack>
   )
}
