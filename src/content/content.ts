import { BEGIN_SELECTION, HIDE_CONTENT } from '@/Messages'
import IframeManager from './IframeManage'
import SelectManager from './SelectManage'

const iframeMGR = new IframeManager()
const selectMGR = new SelectManager()

chrome.runtime.onMessage.addListener((msg) => {
   switch (msg) {
      case HIDE_CONTENT:
         iframeMGR.coverUP()
         break

      case BEGIN_SELECTION:
         selectMGR.init()
         selectMGR.enableSelection()
         break

      default:
         break
   }
})

console.log('Content script loaded')
