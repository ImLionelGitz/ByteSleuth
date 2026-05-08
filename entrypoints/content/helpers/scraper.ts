export default function scrape(list: FieldByte[]) {
   let mainParent = ''
   const elSelectors: string[] = []
   const construct: Record<string, string> = {}

   for (let i = 0; i < list.length; i++) {
      const byte = list[i]
      const [parent, el] = byte.selector.split(' >> ')

      if (i === 0) {
         mainParent = parent
      }

      construct[byte.name] = el
      elSelectors.push(el)
   }

   console.log(getData(mainParent, ...elSelectors))
}

function getData(parent: string, ...others: string[]) {
   const container = document.querySelectorAll(parent)

   return Array.from(container)

   //  const container = document.querySelectorAll('*')

   // return Array.from(container).filter((el) => {
   //    return el.matches(others[0])
}
