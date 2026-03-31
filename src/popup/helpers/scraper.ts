import { EntryBit, TableData } from '@/Types'

export default function startScrape(entries: EntryBit[]) {
   const tableData = entries.map((entry) => {
      const tableSlot: TableData = { title: entry.name, data: [] }
      const sampleEls = document.querySelectorAll<HTMLElement>(entry.selector)
      const extracted = extractData(sampleEls)

      return { ...tableSlot, data: extracted }
   })

   return tableData
}

function extractData(elems: NodeListOf<HTMLElement>) {
   const items = Array.from(elems)

   return items.map((item) => {
      return cleanValue(item)
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
