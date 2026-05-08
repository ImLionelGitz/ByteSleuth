export function generateSelectors(el: HTMLElement): string {
   const mainParent = findTopMostCard(el)

   console.log(mainParent)

   return parentChildSelector(mainParent, el)

   // while (
   //    el &&
   //    el.nodeType === Node.ELEMENT_NODE &&
   //    el.tagName.toLowerCase() !== 'body'
   // ) {
   //    let selector = el.tagName.toLowerCase()

   //    if (el.classList.length > 0) {
   //       const escapedClasses = Array.from(el.classList)
   //          // 1. Filter out known "junk" or dynamic classes (optional but recommended)
   //          .filter((cls) => !/^[a-z0-9]{10,}/i.test(cls))
   //          // 2. CSS.escape is the magic fix for your SyntaxError (=, /, etc)
   //          .map((cls) => CSS.escape(cls))
   //          .join('.')

   //       if (escapedClasses) selector += '.' + escapedClasses
   //    }

   //    path.unshift(selector)
   //    el = el.parentElement
   // }

   // return path.join(' > ')
}

function parentChildSelector(parent: Element, child: Element) {
   const path = []
   let curEl = child

   while (curEl && curEl.nodeType === Node.ELEMENT_NODE) {
      const selector = findSelector(curEl)

      // const parentEl = curEl.parentElement
      // if (parentEl) {
      //    // Look at siblings with the same tag
      //    const siblings = Array.from(parentEl.children).filter(
      //       (sib) => sib.tagName === curEl.tagName
      //    )

      //    if (siblings.length > 1) {
      //       const index = siblings.indexOf(curEl) + 1
      //       selector += `:nth-of-type(${index})`
      //    }
      // }

      path.unshift(selector)

      if (curEl === parent) break
      curEl = curEl.parentElement as Element
   }

   return path.join(' > ')
}

function findSelector(el: Element) {
   const tag = el.tagName.toLowerCase()

   if (el.classList.length > 0) {
      const classString = Array.from(el.classList)
         .filter((cls) => !/[[\]:>]/.test(cls)) // REJECTS [tr:nth-child(odd)>td]:bg-sub-alt
         .filter((cls) => !/^[a-z0-9]{10,}/i.test(cls))
         .map((cls) => CSS.escape(cls))
         .join('.')

      return classString ? tag.concat('.', classString) : tag
   }

   if (el.hasAttributes()) {
      const filter = /^(style|src|href|on.*|id|class|alt)$/i

      const attrString = Array.from(el.attributes)
         .filter((attr) => !filter.test(attr.name))
         .map((attr) =>
            attr.value
               ? `[${attr.name}="${CSS.escape(attr.value)}"]`
               : `[${attr.name}]`
         )
         .join('')

      return tag + attrString
   }

   if (el.id) return `#${el.id}`

   return tag
}

// function getSmartSegment(el: Element): string {
//    const selector = findSelector(el) // Your attribute/class function
//    const parent = el.parentElement
//    if (!parent) return selector

//    // Use .matches() to see if siblings are TRULY identical
//    const identicalSiblings = Array.from(parent.children).filter(
//       (child) =>
//          child.tagName === el.tagName && child.className === el.className
//    )

//    // If they are identical (like Monkeytype rows), we MUST use an index.
//    // If they are unique (like Amazon cards with different IDs), we stay broad.
//    if (identicalSiblings.length > 1) {
//       const index = identicalSiblings.indexOf(el) + 1
//       // Use :nth-child(n) for precise position relative to ALL identical siblings
//       return `${selector}:nth-child(${index})`
//    }

//    return selector
// }

function findTopMostCard(el: HTMLElement) {
   let current = el.parentElement
   let lastValidRepeater = el
   let previousMatchCount = 0

   while (current && current.tagName !== 'BODY') {
      const selector = findSelector(current) // Use your attribute-rich selector
      const matches = document.querySelectorAll(selector)
      const count = matches.length

      // Logic: If this level still repeats (count > 1), it's a potential card.
      // We keep climbing as long as the count stays high.
      // If the count drops significantly (e.g. from 50 rows to 1 table), we stop.
      if (count > 1) {
         lastValidRepeater = current
         previousMatchCount = count
      } else if (previousMatchCount > 1) {
         // We found a level that doesn't repeat, so the level BEFORE was our Card
         break
      }

      current = current.parentElement
   }

   return lastValidRepeater
}
