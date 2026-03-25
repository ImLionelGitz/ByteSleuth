export default class IframeManager {
   private iframe: HTMLIFrameElement
   isOpen: boolean

   constructor() {
      this.iframe = document.createElement('iframe')
      this.isOpen = false

      this.iframe.style.position = 'fixed'
      this.iframe.style.pointerEvents = 'none'
      this.iframe.style.top = '0'
      this.iframe.style.left = '0'
      this.iframe.style.border = '0'
      this.iframe.style.width = '100%'
      this.iframe.style.height = '100%'
      this.iframe.style.zIndex = '999999'
      this.iframe.src = chrome.runtime.getURL('src/popup/index.html')

      document.documentElement.prepend(this.iframe)
   }

   enableIframe() {
      this.iframe.style.pointerEvents = 'all'
      this.isOpen = true
   }

   disableIframe() {
      this.iframe.style.pointerEvents = 'none'
      this.isOpen = false
   }
}
