export default function getSmartSelector(el: Element | null): string {
   const path = []

   while (el && el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.tagName.toLowerCase()

      if (el.className) {
         selector += `[class="${el.classList.value}"]`
         path.unshift(selector)
         break
      }

      let sib: Element | null = el,
         nth = 1

      while ((sib = sib.previousElementSibling)) {
         if (sib.nodeName.toLowerCase() === selector) nth++
      }

      if (nth !== 1) {
         selector += `:nth-of-type(${nth})`
      }

      path.unshift(selector)
      el = el.parentNode as Element
   }

   return path.join(' > ')
}
