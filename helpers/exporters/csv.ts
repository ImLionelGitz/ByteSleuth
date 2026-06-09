import { unparse } from 'papaparse'
import saveFile from './saveAs'

export default function exportCsv(rows: TableByte[]) {
   const csv = unparse(rows)

   saveFile({
      content: csv,
      suggestedName: 'data.csv',
      contentType: 'text/csv',
      extension: '.csv',
      fileDescription: 'CSV File',
   })
}
