export default function Init() {
   const iframe = document.createElement('iframe')
   iframe.style.position = 'fixed'
   iframe.style.height = '0'
   iframe.style.zIndex = '9999'
   iframe.style.border = '0'
   iframe.style.width = '100%'
   iframe.style.transition = '0.2s ease-out'
   iframe.src = chrome.runtime.getURL('src/popup/barrier.html')

   document.documentElement.prepend(iframe)

   return {
      coverUP: () => {
         iframe.style.height = '100%'
      },

      coverDOWN: () => {
         iframe.style.height = '0'
      },
   }
}
