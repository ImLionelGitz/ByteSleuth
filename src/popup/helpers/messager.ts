export default async function sendRequest(request: string) {
   const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
   })

   if (tab.id) {
      chrome.tabs.sendMessage(tab.id, request)
   }
}
