import { OPEN_MENU } from '@/Messages'
import sendRequest from '@/popup/helpers/messager'

chrome.action.onClicked.addListener((tab) => {
   if (tab.id) {
      sendRequest(OPEN_MENU)
   }
})
