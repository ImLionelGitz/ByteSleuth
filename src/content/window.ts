import { LocalData } from '@/Types'
import type IframeManager from './classes/IframeManage'
import SelectManager from './classes/SelectManage'
import { local } from '@/Messages'

export default function window_communicator(iframeMGR: IframeManager) {
   const selectMGR = new SelectManager()
   const extensionOrigin = `chrome-extension://${chrome.runtime.id}`
   const webOrigin = window.location.origin

   window.addEventListener('message', (e: MessageEvent<LocalData>) => {
      if (e.origin === extensionOrigin || e.origin === webOrigin) {
         switch (e.data.type) {
            case 'BEGIN_SELECTION':
               selectMGR.enableSelection()
               iframeMGR.disableIframe()
               iframeMGR.notify(local.HIDE_MENU)
               break

            default:
               break
         }
      }
   })
}
