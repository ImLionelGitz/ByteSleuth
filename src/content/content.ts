import { cross, local } from '@/Messages'
import IframeManager from './classes/IframeManage'
import SelectManager from './classes/SelectManage'

export default function chrome_communicator(
   iframeMGR: IframeManager,
   selectMGR: SelectManager
) {
   chrome.runtime.onMessage.addListener((msg) => {
      if (selectMGR.isSelecting) return

      switch (msg) {
         case cross.APP_OPEN:
            if (iframeMGR.isEnabled) {
               iframeMGR.disableIframe()
               iframeMGR.notify(local.HIDE_MENU)
            } else {
               iframeMGR.enableIframe()
               iframeMGR.notify(local.OPEN_MENU)
            }

            break

         default:
            break
      }
   })
}
