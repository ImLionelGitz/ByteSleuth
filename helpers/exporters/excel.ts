import { write, utils } from 'xlsx'
import saveFile from './saveAs'

export default function exportExcel(rows: TableByte[]) {
   const worksheet = utils.json_to_sheet(rows)
   const workbook = utils.book_new()

   utils.book_append_sheet(workbook, worksheet, 'Results')

   const excelBuffer: ArrayBuffer = write(workbook, {
      bookType: 'xlsx',
      type: 'array',
   })

   saveFile({
      content: excelBuffer,
      suggestedName: 'data.xlsx',
      contentType:
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      extension: '.xlsx',
      fileDescription: 'Excel Spreadsheet',
   })
}
