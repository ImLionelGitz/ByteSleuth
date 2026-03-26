export default function getSmartSelector(el: HTMLElement): string {
   let current: HTMLElement | null = el
   const path: string[] = []

   while (current && path.length < 3) {
      let part = ''

      if (current.id) {
         part = `#${cssEscape(current.id)}`
         path.unshift(part)
         break
      }

      const classes = getUsefulClasses(current)

      if (classes.length > 0) {
         part = `${current.tagName.toLowerCase()}.${classes.join('.')}`
      } else {
         part = current.tagName.toLowerCase()
      }

      path.unshift(part)

      const selector = path.join(' ')
      const matches = document.querySelectorAll(selector)

      if (matches.length <= 10) break

      current = current.parentElement
   }

   return path.join(' ')
}

function cssEscape(str: string): string {
   return str.replace(/([ #;?%&,.+*~':"!^$[\]()=>|/@])/g, '\\$1')
}

function getUsefulClasses(el: HTMLElement): string[] {
   return Array.from(el.classList).filter((cls) => {
      return (
         cls.length < 30 && // avoid long hashed classes
         !cls.match(/^\d/) && // avoid numeric classes
         !cls.includes('active') && // dynamic states
         !cls.includes('hover') &&
         !cls.includes('selected')
      )
   })
}
