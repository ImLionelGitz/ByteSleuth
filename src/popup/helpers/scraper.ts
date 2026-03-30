import { EntryBit, TableData } from '@/Types'
import getSmartSelector from './selector'

export default function startScrape(entries: EntryBit[]) {
   const tableData = entries.map((entry) => {
      const tableSlot: TableData = { title: entry.name, data: [] }
      const sampleEls = document.querySelector<HTMLElement>(entry.selector)

      if (!sampleEls) return tableSlot

      const container = findBestContainer(sampleEls)
      const txtArray = extractData(container, entry.selector)

      return { ...tableSlot, data: txtArray }
   })

   return tableData

   // const msg: CrossData = { type: 'RETRIEVE_DATA' }
   // const multiData: MultiLookData = await chrome.runtime.sendMessage(msg)

   // if (multiData.enabled) {
   //    recurPages(multiData.nextBtn, multiData.maxPages)
   // }

   //    const sampleEl = document.querySelector(
   //       selectedSelectors.title
   //    ) as HTMLElement

   //    if (!sampleEl) {
   //       alert('Could not find elements')
   //       return
   //    }

   //    const container = findBestContainer(sampleEl)

   //    const data = extractData(container, selectedSelectors)
}

function findBestContainer(el: HTMLElement): HTMLElement {
   let current: HTMLElement | null = el

   while (current) {
      const parent: HTMLElement | null = current.parentElement
      if (!parent) break

      const children = Array.from<Element>(parent.children)

      // Count how many children look similar
      const sameTag = children.filter(
         (child) => child.tagName === current!.tagName
      )

      if (sameTag.length >= 3) {
         return parent
      }

      current = parent
   }

   return el
}

function extractData(container: HTMLElement, selector: string) {
   const conSelector = getSmartSelector(container)
   const slots = document.querySelectorAll(conSelector)

   const items = Array.from(slots)

   return items.map((item) => {
      const el = item.matches(selector) ? item : item.querySelector(selector)
      return cleanValue(el)
   })
}

function cleanValue(el: Element | null): string {
   if (!el) return ''

   // Try image inside element
   const img = el.tagName.toLowerCase() === 'img' ? el : el.querySelector('img')

   if (img) {
      const src =
         (img as HTMLImageElement).src ||
         img.getAttribute('data-src') ||
         img.getAttribute('srcset')

      if (src) return toAbsoluteUrl(src)
   }

   // Try link
   if (el.tagName === 'A') {
      const href = (el as HTMLAnchorElement).href || el.getAttribute('href')

      if (href) return toAbsoluteUrl(href)
   }

   // Fallback text
   return cleanText(el)
}

function toAbsoluteUrl(url: string): string {
   try {
      return new URL(url, window.location.origin).href
   } catch {
      return url
   }
}

function cleanText(el: Element | null) {
   return el?.textContent?.replace(/\s+/g, ' ').trim() || ''
}
