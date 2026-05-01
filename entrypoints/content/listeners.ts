import { receiver, sendToBackground } from '@/helpers/messager'
import SelectManager from './classes/SelectManage'

export default function setupListeners(iframe: HTMLElement) {
   receiver((msg, _, reply) => {
      switch (msg.message) {
         case 'select an element': {
            const selectMgr = new SelectManager(reply)
            selectMgr.firstSelection(iframe)
            sendToBackground({ message: 'window minimize' })
            return true
         }

         default:
            break
      }
   })
}
