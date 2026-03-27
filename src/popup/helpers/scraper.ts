import { EntryBit, TableData } from '@/Types'

export default function startScrape(entries: EntryBit[]) {
   const test = entries.map((entry) => {
      const tableSlot: TableData = { title: entry.name, data: [] }
      const sampleEls = document.querySelectorAll<HTMLElement>(entry.selector)

      if (!sampleEls) return tableSlot

      //const txtArray = Array.from(sampleEls).map((el) => textNodesUnder(el))

      //console.log(txtArray.filter((txt) => txt.length === 1 && txt[0].length > 1))

      return { ...tableSlot, data: [] }
   })

   console.log(test)

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

// function textNodesUnder(el: HTMLElement) {
//    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
//       acceptNode(node) {
//          const parent = node.parentElement
//          if (!parent) return NodeFilter.FILTER_REJECT

//          const tag = parent.tagName
//          if (tag === 'SCRIPT' || tag === 'STYLE') {
//             return NodeFilter.FILTER_REJECT
//          }

//          const style = window.getComputedStyle(parent)
//          if (style.display === 'none' || style.visibility === 'hidden') {
//             return NodeFilter.FILTER_REJECT
//          }

//          if (!node.textContent?.trim()) {
//             return NodeFilter.FILTER_REJECT
//          }

//          return NodeFilter.FILTER_ACCEPT
//       },
//    })

//    const result = []
//    let node

//    while ((node = walker.nextNode())) {
//       result.push(node.textContent!.replace(/\s+/g, ' ').trim())
//    }

//    return result
// }

// function findBestContainer(el: HTMLElement): HTMLElement {
//    let current: HTMLElement | null = el

//    while (current) {
//       const parent: HTMLElement | null = current.parentElement
//       if (!parent) break

//       const children = Array.from<Element>(parent.children)

//       // Count how many children look similar
//       const sameTag = children.filter(
//          (child) => child.tagName === current!.tagName
//       )

//       if (sameTag.length >= 3) {
//          return parent
//       }

//       current = parent
//    }

//    return el
// }

// function extractData(container: HTMLElement, selectors: TableData[]) {
//    const items = Array.from(container.children)

//    return items.map((item) => {
//       const row: any = {}

//       if (selectors.title) {
//          row.title =
//             item.querySelector(selectors.title)?.textContent?.trim() || ''
//       }

//       if (selectors.price) {
//          row.price =
//             item.querySelector(selectors.price)?.textContent?.trim() || ''
//       }

//       return row
//    })
// }
