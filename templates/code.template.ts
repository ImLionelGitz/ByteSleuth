function makeSelector(el: HTMLElement): string {
   const tag = el.tagName.toLowerCase()

   if (el.classList.length > 0) {
      const classString = Array.from(el.classList)
         .filter((cls) => !/[[\]:>]/.test(cls))
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
