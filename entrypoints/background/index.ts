import { receiver } from '@/helpers/messager'

export default defineBackground(() => {
   let windowID = 0

   browser.action.onClicked.addListener(() => {
      browser.windows.create(
         {
            url: '/window.html',
            width: 854,
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

   receiver((msg) => {
      switch (msg.message) {
         case 'select a root':
            browser.windows.update(windowID, { state: 'minimized' })
            break

         case 'core data found':
         case 'data found':
            browser.windows.update(windowID, { state: 'normal' })
            break

         default:
            break
      }
   })
})
