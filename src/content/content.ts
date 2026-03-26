import { cross } from '@/Messages'
import IframeManager from './classes/IframeManage'
import window_communicator from './window'

const iframeMGR = new IframeManager()

window_communicator(iframeMGR)

chrome.runtime.onMessage.addListener((msg) => {
   switch (msg) {
      case cross.APP_OPEN:
         if (iframeMGR.isEnabled) {
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
