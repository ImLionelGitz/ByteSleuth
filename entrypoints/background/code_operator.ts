import { giveScript } from '@/helpers/datastores/scriptDatabase'
import { getCurrentTabID, sendToBackground } from '@/helpers/messager'
import fieldSample from '@/templates/field.template.ts?raw'
import scraperSample from '@/templates/scrape.template.ts?raw'
import fieldMainJS from '@/templates/exec.template.js?raw'
import scraperMainJS from '@/templates/exec2.template.js?raw'
import { transform } from '@babel/standalone'
import { ROW_CONT_LOGIC, SCRAPER_LOGIC } from '@/helpers/vars'

export async function executeFieldCode(fieldID: number) {
   const script = await giveScript(fieldID)
   const tabId = await getCurrentTabID()

   const mainCode = transform(script?.code || fieldSample, {
      presets: ['typescript'],
      filename: 'script.ts',
   })

   if (mainCode.code && tabId) {
      const build = `
         ${mainCode.code};

         ${fieldMainJS}
         `

      try {
         const respond = await browser.userScripts.execute<string>({
            target: { tabId: tabId },
            js: [{ code: build }],
         })

         return respond[0].result
      } catch (e) {
         const error = e as Error

         sendToBackground({
            message: 'error occured',
            err: error.message || '',
         })
      }
   }

   return ''
}

export async function executeScrapeCode(list: FieldByte[]) {
   const script = await giveScript(SCRAPER_LOGIC)
   const tabId = await getCurrentTabID()

   const mainCode = transform(script?.code || scraperSample, {
      presets: ['typescript'],
      filename: 'script.ts',
   })

   const mainField = list.find((f) => f.id === ROW_CONT_LOGIC)

   if (mainCode.code && tabId && mainField) {
      const cfg = {
         rowSelector: mainField.selector,
         fields: list.filter((f) => f.id !== ROW_CONT_LOGIC),
      }

      const build = `
         (() => {
          const cfg = ${JSON.stringify(cfg)};

         ${mainCode.code};

         ${scraperMainJS}
          })()
         `

      try {
         const respond = await browser.userScripts.execute<TableByte[]>({
            target: { tabId: tabId },
            js: [{ code: build }],
         })

         return respond[0].result
      } catch (e) {
         const error = e as Error

         sendToBackground({
            message: 'error occured',
            err: error.message || '',
         })
      }
   }

   return []
}
