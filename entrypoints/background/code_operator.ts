import { giveScript } from '@/helpers/datastores/scriptDatabase'
import { getCurrentTabID } from '@/helpers/messager'
import sample from '@/templates/code.template.ts?raw'
import mainJS from '@/templates/exec.template.js?raw'
import { transform } from '@babel/standalone'

export default async function executeFieldCode(fieldID: number) {
   const script = await giveScript(fieldID)
   const tabId = await getCurrentTabID()

   const mainCode = transform(script?.code || sample, {
      presets: ['typescript'],
      filename: 'script.ts',
   })

   if (mainCode.code && tabId) {
      const build = `
         ${mainCode.code};

         ${mainJS}
         `

      const respond = await browser.userScripts.execute<string>({
         target: { tabId: tabId },
         js: [{ code: build }],
      })

      return respond[0].result
   }

   return ''
}
