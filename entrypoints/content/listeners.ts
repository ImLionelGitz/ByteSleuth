import { receiver } from '@/helpers/messager'
import SelectManager from './classes/SelectManage'

export default function setupListeners(iframe: HTMLElement) {
   const selectMgr = new SelectManager()

   receiver((msg) => {
      switch (msg.message) {
         case 'select a root': {
            selectMgr.enableFirstSelection(iframe)
            break
         }

         default:
            break
      }
   })
}
