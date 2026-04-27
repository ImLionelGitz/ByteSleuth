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

   browser.runtime.onMessage.addListener((msg: Messages) => {
      switch (msg.message) {
         case 'hide window':
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
