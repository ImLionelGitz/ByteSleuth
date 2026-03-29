import { cross } from '@/Messages'
import sendRequest from '@/popup/helpers/messager'
import { ChromeData } from '@/Types'
import { ResultsField } from '@/Vars'

let curWindowID: number | null = null

chrome.action.onClicked.addListener((tab) => {
   sendRequest(cross.APP_OPEN, tab.id)
})

chrome.windows.onRemoved.addListener((winID) => {
   if (winID === curWindowID) curWindowID = null
})

chrome.runtime.onMessage.addListener((msg: ChromeData) => {
   switch (msg.type) {
      case 'SCRAPE_COMPLETE':
         chrome.storage.session.set({ [ResultsField]: msg.payload })
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
