import { TableData } from '@/Types'

export default function diffScrapedData(
   existings: TableData[],
   testWith: TableData[]
) {
   const existingKeys = new Set(existings.map(getItemKey))

   const filtered = testWith.filter((item) => {
      const key = getItemKey(item)
      return !existingKeys.has(key)
   })

   const newItems = existings.map((val) => {
      const itemF = filtered.find((t) => t.title === val.title)

      if (itemF) {
         return { ...val, data: [...val.data, ...itemF.data] }
      }

      return val
   })

   return newItems
}

function getItemKey(item: TableData): string {
   return `${item.title}|${item.data.join('|')}`
}
