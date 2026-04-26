import SelectManager from './classes/SelectManage'

export default function setupListeners(iframe: HTMLElement) {
   const selectMgr = new SelectManager(iframe)

   browser.runtime.onMessage.addListener((msg: Messages) => {
      switch (msg.message) {
         case 'select a root':
            selectMgr.enableSelection(0)
            break

         default:
            break
      }
   })
}
