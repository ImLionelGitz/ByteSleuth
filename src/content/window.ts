import { local } from '@/Messages'
import { ChromeData, EntryBit, LocalData } from '@/Types'
import type IframeManager from './classes/IframeManage'
import SelectManager from './classes/SelectManage'
import startScrape from '@/popup/helpers/scraper'
import { TableFields } from '@/Vars'

export default function window_communicator(
   selectMGR: SelectManager,
   iframeMGR: IframeManager
) {
   const extensionOrigin = `chrome-extension://${chrome.runtime.id}`
   const webOrigin = window.location.origin

   window.addEventListener('message', async (e: MessageEvent<LocalData>) => {
      if (e.origin === extensionOrigin || e.origin === webOrigin) {
         switch (e.data.type) {
            case 'BEGIN_SELECTION':
               selectMGR.enableSelection(e.data.payload)
               iframeMGR.disableIframe()
               iframeMGR.notify(local.HIDE_MENU)
               break

            case 'SELECTOR_FOUND':
               selectMGR.disableSelection()
               iframeMGR.enableIframe()
               iframeMGR.notify(local.OPEN_MENU)
               break

            case 'START_SCRAPE': {
               const loaded = await chrome.storage.local.get(TableFields)
               const entries = loaded[TableFields] as EntryBit[]
               const list = startScrape(entries)

               const msg: ChromeData = {
                  type: 'SCRAPE_COMPLETE',
                  payload: list,
               }

               chrome.runtime.sendMessage(msg)
               break
            }

            case 'START_COLLECTING': {
               const loaded = await chrome.storage.local.get(TableFields)
               const entries = loaded[TableFields] as EntryBit[]

               startScrape(entries)
               break
            }

            default:
               break
         }
      }
   })
}
