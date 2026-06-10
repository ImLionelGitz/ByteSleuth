import fieldSample from '@/templates/field.template.ts?raw'
import scraperSample from '@/templates/scrape.template.ts?raw'
import { SCRAPER_LOGIC } from '../vars'
import { format } from 'prettier/standalone'
import typescriptPlugin from 'prettier/plugins/typescript'
import estreePlugin from 'prettier/plugins/estree'
import { checkCodeSignature, hasInfiniteLoop } from './illegalCheckers'

async function formatCode(code: string) {
   return format(code, {
      parser: 'typescript',
      plugins: [typescriptPlugin, estreePlugin],
      semi: false,
      singleQuote: true,
      tabWidth: 3,
      trailingComma: 'es5',
      endOfLine: 'crlf',
   })
}

function isCodeDefault(code: string, id: number) {
   const sample = id === SCRAPER_LOGIC ? scraperSample : fieldSample
   return normalize(code) === normalize(sample)
}

function normalize(code: string) {
   return code.replace(/\r\n/g, '').trim()
}

export { formatCode, isCodeDefault, checkCodeSignature, hasInfiniteLoop }
