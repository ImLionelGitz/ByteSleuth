import { cross } from '@/Messages'
import sendRequest from '@/popup/helpers/messager'

chrome.action.onClicked.addListener((tab) => {
   sendRequest(cross.APP_OPEN, tab.id)
})
