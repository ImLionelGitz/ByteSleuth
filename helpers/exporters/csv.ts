import { unparse } from 'papaparse'

export default function exportCsv(rows: TableByte[]) {
   const csv = unparse(rows)

   const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
   })

   const url = URL.createObjectURL(blob)

   const a = document.createElement('a')
   a.href = url
   a.download = 'data.csv'
   a.click()

   URL.revokeObjectURL(url)
}
