import { receiver, sendToBackground } from '@/helpers/messager'
import SelectManager from './classes/SelectManage'
import scrape from './helpers/scraper'

export default function setupListeners(
   iframe: HTMLElement,
   highlight: (b: BoxCoords[]) => void
) {
   receiver((msg, _, reply) => {
      const selectMgr = new SelectManager(iframe, reply, highlight)

      switch (msg.message) {
         case 'select an element':
            selectMgr.enableSelection()
            sendToBackground({ message: 'window minimize' })
            return true

         case 'selection cancelled':
            selectMgr.disableSelection()
            break

         case 'begin scrape':
            scrape(msg.list)
            break

         default:
            break
      }
   })
}
