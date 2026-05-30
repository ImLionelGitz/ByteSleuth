import { receiver } from '@/helpers/messager'
import executeFieldCode from './code_operator'

export default defineBackground(() => {
   let windowID = 0

   browser.action.onClicked.addListener(() => {
      if (windowID) {
         browser.windows.update(windowID, { focused: true })
         return
      }

      browser.windows.create(
         {
            url: '/window.html',
            width: 640,
            height: 480,
            type: 'popup',
         },
         (win) => {
            if (win && win.id) {
               windowID = win.id
            }
         }
      )
   })

   browser.windows.onRemoved.addListener((id) => {
      if (id === windowID) {
         windowID = 0
      }
   })

   receiver<'BG'>((msg, _, reply) => {
      switch (msg.message) {
         case 'select an element': {
            executeFieldCode(msg.fieldId).then((res) => reply(res))
            return true
         }

         default:
            break
      }
   })
})
