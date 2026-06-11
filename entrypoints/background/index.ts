import { receiver } from '@/helpers/messager'
import { executeFieldCode, executeScrapeCode } from './code_operator'

export default defineBackground(() => {
   browser.action.onClicked.addListener(async () => {
      const windowID = await storage.getItem<number>('session:winID')

      if (windowID) {
         browser.windows.update(windowID, { focused: true })
         return
      }

      const win = await browser.windows.create({
         url: '/window.html',
         width: 640,
         height: 480,
         type: 'popup',
      })

      if (win && win.id) {
         storage.setItem('session:winID', win.id)
      }
   })

   browser.windows.onRemoved.addListener(async (id) => {
      const windowID = await storage.getItem<number>('session:winID')

      if (id === windowID) {
         storage.removeItem('session:winID')
      }
   })

   receiver<'BG'>((msg, _, reply) => {
      switch (msg.message) {
         case 'select an element': {
            executeFieldCode(msg.fieldId).then(async (res) => {
               const windowID = await storage.getItem<number>('session:winID')
               if (!windowID) return

               await browser.windows.update(windowID, {
                  focused: true,
                  drawAttention: true,
               })

               reply(res)
            })

            return true
         }

         case 'scrape': {
            executeScrapeCode(msg.fields).then((res) => reply(res))
            return true
         }

         default:
            break
      }
   })
})
