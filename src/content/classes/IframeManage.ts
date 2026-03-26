export default class IframeManager {
   private iframe: HTMLIFrameElement
   isEnabled: boolean

   constructor() {
      this.iframe = document.createElement('iframe')
      this.isEnabled = false

      this.iframe.style.position = 'fixed'
      this.iframe.style.pointerEvents = 'none'
      this.iframe.style.top = '0'
      this.iframe.style.left = '0'
      this.iframe.style.border = '0'
      this.iframe.style.width = '100%'
      this.iframe.style.height = '100%'
      this.iframe.style.zIndex = '999999'
      this.iframe.src = chrome.runtime.getURL('src/popup/index.html')

      document.body.appendChild(this.iframe)
   }

   enableIframe() {
      this.iframe.style.pointerEvents = 'all'
      this.isEnabled = true
   }

   disableIframe() {
      this.iframe.style.pointerEvents = 'none'
      this.isEnabled = false
   }

   notify(message: string) {
      this.iframe.contentWindow?.postMessage(message, '*')
   }
}
