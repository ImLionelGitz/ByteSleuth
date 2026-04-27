import SelectManager from './classes/SelectManage'

export default function setupListeners(iframe: HTMLElement) {
   const selectMgr = new SelectManager()

   browser.runtime.onMessage.addListener((msg: Messages) => {
      switch (msg.message) {
         case 'select a root': {
            const msg: Messages = { message: 'hide window' }
            selectMgr.enableFirstSelection(iframe)
            browser.runtime.sendMessage(msg)
            break
         }

         default:
            break
      }
   })
}
