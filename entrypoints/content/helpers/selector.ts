export function generateSelectors(el: HTMLElement): string {
   const mainParent = findTopMostCard(el)

   const mainSelector = findSelector(mainParent)
   const elemSelector = findSelector(el)

   return mainSelector && elemSelector
      ? `${mainSelector} >> ${elemSelector}`
      : ''

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

function findSelector(el: HTMLElement | null) {
   while (el && el.tagName !== 'BODY') {
      const tag = el.tagName.toLowerCase()

      const classes = Array.from(el.classList)
         //.filter((cls) => !/^[a-z0-9]{10,}/i.test(cls))
         .map((cls) => CSS.escape(cls))
         .join('.')

      if (classes) {
         const selector = `${tag}.${classes}`
         const matches = document.querySelectorAll(selector)

         if (matches.length > 0) {
            return selector
         }
      }

      const ignoreRegex = /^(style|src|href|on.*|id|class|alt)$/i
      const attributes = Array.from(el.attributes)
         .filter((attr) => !ignoreRegex.test(attr.name))
         .map((attr) =>
            attr.value ? `[${attr.name}=${attr.value}]` : `[${attr.name}]`
         )
         .join('')

      if (attributes) {
         const selector = tag.concat(attributes)

         try {
            const matches = document.querySelectorAll(selector)

            if (matches.length > 0) {
               return selector
            }
         } catch {
            el = el.parentElement
            continue
         }
      }

      el = el.parentElement
   }

   return ''
}

function findTopMostCard(el: HTMLElement) {
   let current = el.parentElement
   let bestCard = el
   let maxMatches = 0

   while (current && current.tagName !== 'BODY') {
      const tag = current.tagName.toLowerCase()
      const classes = Array.from(current.classList)
         .filter((cls) => !/^[a-z0-9]{10,}/i.test(cls))
         .map((cls) => CSS.escape(cls))
         .join('.')

      if (classes) {
         const selector = `${tag}.${classes}`
         const matches = document.querySelectorAll(selector)

         // We want the HIGHEST element that still represents the "list item"
         // Usually, once you go above the card, the match count drops to 1 (the grid itself)
         if (matches.length >= maxMatches && matches.length > 1) {
            maxMatches = matches.length
            bestCard = current
         }
      }
      current = current.parentElement
   }

   return bestCard
}
