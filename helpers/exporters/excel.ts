import { writeFile, utils } from 'xlsx'

export default function exportExcel(rows: TableByte[]) {
   const worksheet = utils.json_to_sheet(rows)

   const workbook = utils.book_new()

   utils.book_append_sheet(workbook, worksheet, 'Results')

   writeFile(workbook, 'data.xlsx')
}
