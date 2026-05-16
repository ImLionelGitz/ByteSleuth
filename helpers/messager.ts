type MsgEvent = (
   msg: Messages,
   sender: Browser.runtime.MessageSender,
   reply: (msg: unknown) => void
) => void

const receiver = (cb: MsgEvent) => {
   browser.runtime.onMessage.addListener(cb)
}

function sendToBackground<T>(msg: Messages): Promise<T> {
   return browser.runtime.sendMessage(msg)
}

function sendToContentJS<T>(tabID: number, msg: Messages): Promise<T> {
   return browser.tabs.sendMessage(tabID, msg)
}

async function getCurrentTabID() {
   const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: false,
   })

   return tab.id
}

export { receiver, sendToBackground, sendToContentJS, getCurrentTabID }
