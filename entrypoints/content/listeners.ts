import { receiver } from '@/helpers/messager'
import SelectManager from './classes/SelectManage'

export default function setupListeners(iframe: HTMLElement) {
   receiver((msg, _, reply) => {
      switch (msg.message) {
         case 'select a root': {
            const selectMgr = new SelectManager(reply)
            selectMgr.firstSelection(iframe)
            return true
         }

         default:
            break
      }
   })
}
