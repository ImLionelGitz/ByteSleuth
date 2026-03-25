export default class IframeManager {
   private iframe: HTMLIFrameElement

   constructor() {
      this.iframe = document.createElement('iframe')
      this.iframe.style.position = 'fixed'
      this.iframe.style.height = '0'
      this.iframe.style.zIndex = '9999'
      this.iframe.style.border = '0'
      this.iframe.style.width = '100%'
      this.iframe.style.transition = '0.2s ease-out'
      this.iframe.src = chrome.runtime.getURL('src/popup/barrier.html')

      document.documentElement.prepend(this.iframe)
   }

   coverUP() {
      this.iframe.style.height = '100%'
   }

   coverDOWN() {
      this.iframe.style.height = '0'
   }
}
