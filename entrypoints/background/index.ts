export default defineBackground(() => {
   browser.action.onClicked.addListener(() => {
      browser.windows.create({
         url: '/window.html',
         width: 854,
         height: 480,
         type: 'popup',
      })

      console.log('lol', { id: browser.runtime.id })
   })
})
