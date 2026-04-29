type Respond = string | number | boolean

type MsgEvent = (
   msg: Messages,
   sender: Browser.runtime.MessageSender,
   reply: (msg: Respond) => void
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

export { receiver, sendToBackground, sendToContentJS }
