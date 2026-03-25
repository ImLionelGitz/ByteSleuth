import { BEGIN_SELECTION, OPEN_MENU } from '@/Messages'
import IframeManager from './IframeManage'
import SelectManager from './SelectManage'

const iframeMGR = new IframeManager()
const selectMGR = new SelectManager()

chrome.runtime.onMessage.addListener((msg) => {
   switch (msg) {
      case BEGIN_SELECTION:
         selectMGR.init()
         selectMGR.enableSelection()
         break

      case OPEN_MENU:
         if (iframeMGR.isOpen) {
            iframeMGR.disableIframe()
         } else {
            iframeMGR.enableIframe()
         }

         break

      default:
         break
   }
})

console.log('Content script loaded')
