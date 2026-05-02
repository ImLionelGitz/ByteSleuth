import { receiver, sendToBackground } from '@/helpers/messager'
import SelectManager from './classes/SelectManage'

export default function setupListeners(iframe: HTMLElement) {
   receiver((msg, _, reply) => {
      const selectMgr = new SelectManager(iframe, reply)

      switch (msg.message) {
         case 'select an element':
            selectMgr.enableSelection()
            sendToBackground({ message: 'window minimize' })
            return true

         case 'selection cancelled':
            selectMgr.disableSelection()
            break

         default:
            break
      }
   })
}
