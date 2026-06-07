function makeSelector(el: HTMLElement): string {
   let tag = el.tagName.toLowerCase()

   if (el.parentElement) {
      const siblings = Array.from(el.parentElement.children)

      if (siblings.length > 1) {
         const index = siblings.indexOf(el) + 1
         tag += `:nth-child(${index})`
      }
   }

   if (el.classList.length > 0) {
      const classString = Array.from(el.classList)
         //.filter((cls) => !/[[\]:>]/.test(cls))
         //.filter((cls) => !/^[a-z0-9]{10,}/i.test(cls))
         .map((cls) => CSS.escape(cls))
         .join('.')

      if (classString) tag = tag.concat('.', classString)
   }

   return tag
}
