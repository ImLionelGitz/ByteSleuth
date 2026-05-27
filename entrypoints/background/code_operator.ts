import { getCurrentTabID } from '@/helpers/messager'

export default async function handleCode(
   coords: MouseCoords,
   code: string,
   cb: (s: string) => void
) {
   const tabID = await getCurrentTabID()

   if (tabID) {
      const respond = await browser.userScripts.execute({
         target: { tabId: tabID },
         js: [
            {
               code: `${code}; makeSelector(null);`,
            },
         ],
      })

      if (respond[0].result) {
         cb(respond[0].result as string)
      } else {
         cb('rfrf')
      }
   }
}
