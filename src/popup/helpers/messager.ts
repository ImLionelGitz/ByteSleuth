export default async function sendRequest(request: string, tabID?: number) {
   if (tabID) {
      chrome.tabs.sendMessage(tabID, request)
   } else {
      const [tab] = await chrome.tabs.query({
         active: true,
         currentWindow: true,
      })

      if (tab.id) {
         chrome.tabs.sendMessage(tab.id, request)
      }
   }
}
