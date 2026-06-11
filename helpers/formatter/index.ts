import { templates } from '@/templates'
import { SCRAPER_LOGIC } from '../vars'
import { checkCodeSignature, hasInfiniteLoop } from './illegalCheckers'

function isCodeDefault(code: string, id: number) {
   const { scraperSample, fieldSample } = templates
   const sample = id === SCRAPER_LOGIC ? scraperSample : fieldSample
   return normalize(code) === normalize(sample)
}

function normalize(code: string) {
   return code.replace(/\r\n/g, '').trim()
}

export { checkCodeSignature, hasInfiniteLoop, isCodeDefault }
