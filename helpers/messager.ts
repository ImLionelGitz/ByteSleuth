interface BaseCode {
   BG: BGMessages
   CTX: ContentMessages
}

type MsgEvent<T> = (
   msg: T extends keyof BaseCode ? BaseCode[T] : T,
   sender: Browser.runtime.MessageSender,
   reply: (msg: unknown) => void
) => void

const receiver = <T extends keyof BaseCode>(cb: MsgEvent<T>) => {
   browser.runtime.onMessage.addListener(cb)
}

function sendToBackground<T>(msg: BGMessages): Promise<T> {
   return browser.runtime.sendMessage(msg)
}

function sendToContentJS<T>(tabID: number, msg: ContentMessages): Promise<T> {
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
