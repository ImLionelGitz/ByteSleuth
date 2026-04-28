type MsgEvent = (
   msg: Messages,
   sender: Browser.runtime.MessageSender,
   reply: (msg: Messages) => void
) => void

/**
 * Connect to message receiver which gets triggered by `sendToBackground` or `sendToContentJS`.
 * @param cb The callback function with the message data
 */
const receiver = (cb: MsgEvent) => {
   browser.runtime.onMessage.addListener(cb)
}

/**
 * Send a message to the background service.
 * @param msg Define a message to transmit
 */
function sendToBackground(msg: Messages) {
   browser.runtime.sendMessage(msg)
}

/**
 * Send a message to the content script located at the tab identified via the `tabID`.
 * @param tabID The tab ID needed to locate the content script
 * @param msg The message to transmit to the content script
 */
function sendToContentJS(tabID: number, msg: Messages) {
   browser.tabs.sendMessage(tabID, msg)
}

export { receiver, sendToBackground, sendToContentJS }
