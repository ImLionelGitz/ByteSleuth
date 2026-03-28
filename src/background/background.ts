import { cross } from '@/Messages'
import sendRequest from '@/popup/helpers/messager'
import { CrossData, MultiLookData } from '@/Types'
import { NxtFields } from '@/Vars'

chrome.action.onClicked.addListener((tab) => {
   sendRequest(cross.APP_OPEN, tab.id)
})

chrome.runtime.onMessage.addListener((msg: CrossData, _, sendResponse) => {
   if (msg.type === 'SAVE_MULTIPAGE') {
      chrome.storage.session.get(NxtFields, async (res) => {
         const curData = res[NxtFields] as MultiLookData

         const modData: MultiLookData = {
            ...curData,
            nextBtn: msg.payload,
         }

         console.log(modData)

         await chrome.storage.session.set({ [NxtFields]: modData })
         sendResponse(cross.DONE_NXT_SAVE)
      })

      return true
   }

   if (msg.type === 'RETRIEVE_DATA') {
      chrome.storage.session.get(NxtFields, async (res) => {
         const curData = res[NxtFields] as MultiLookData
         sendResponse(curData)
      })

      return true
   }
})
