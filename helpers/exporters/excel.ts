import saveFile from './saveAs'

export default async function exportExcel(rows: TableByte[]) {
   const XLSX = await import('xlsx')

   const worksheet = XLSX.utils.json_to_sheet(rows)
   const workbook = XLSX.utils.book_new()

   XLSX.utils.book_append_sheet(workbook, worksheet, 'Results')

   const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
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
