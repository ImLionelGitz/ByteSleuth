import { cross } from '@/Messages'
import diffScrapedData from '@/popup/helpers/differ'
import sendRequest from '@/popup/helpers/messager'
import { ChromeData, TableData } from '@/Types'
import { ResultsField } from '@/Vars'

let curWindowID: number | null = null

chrome.action.onClicked.addListener((tab) => {
   sendRequest(cross.APP_OPEN, tab.id)
})

chrome.windows.onRemoved.addListener((winID) => {
   if (winID === curWindowID) curWindowID = null
})

chrome.runtime.onMessage.addListener(async (msg: ChromeData) => {
   switch (msg.type) {
      case 'SCRAPE_COMPLETE':
         chrome.storage.session.set({ [ResultsField]: msg.payload })
         openWindow()
         break

      case 'DIFF_SCRAPED': {
         const rawPrev = await chrome.storage.session.get(ResultsField)
         const prev = rawPrev[ResultsField] as TableData[] | null

         if (!prev) {
            chrome.storage.session.set({ [ResultsField]: msg.payload })
            break
         }

         const diff = diffScrapedData(prev, msg.payload)
         chrome.storage.session.set({ [ResultsField]: diff })
         break
      }

      case 'OPEN_WINDOW':
         openWindow()
         break

      default:
         break
   }
})

function openWindow() {
   if (curWindowID) {
      chrome.windows.update(curWindowID, { focused: true })
      return
   }

   chrome.windows.create(
      {
         url: chrome.runtime.getURL('src/popup/result.html'),
         type: 'popup',
         width: 800,
         height: 600,
      },
      (win) => {
         if (win) curWindowID = win.id!
      }
   )
}
