import { receiver } from '@/helpers/messager'
import handleData from './data_operator'

export default defineBackground(() => {
   let windowID = 0

   browser.action.onClicked.addListener(() => {
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

      console.log('lol', { id: browser.runtime.id })
   })

   receiver((msg, _, reply) => {
      switch (msg.message) {
         case 'window minimize':
            browser.windows.update(windowID, { state: 'minimized' })
            break

         case 'window return':
            browser.windows.update(windowID, { state: 'normal' })
            break

         case 'save data':
            handleData(msg, reply)
            break

         case 'give data':
            handleData(msg, reply)
            return true

         default:
            break
      }
   })
})
