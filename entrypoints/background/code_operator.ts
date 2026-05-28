import mainJS from '@/templates/exec.template.js?raw'
import { getScript } from '@/helpers/datastores/scriptDatabase'
import sample from '@/templates/code.template.ts?raw'
import { transform } from '@babel/standalone'
import { getCurrentTabID } from '@/helpers/messager'

export default async function executeFieldCode(fieldID: number) {
   const script = await getScript(fieldID)
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
