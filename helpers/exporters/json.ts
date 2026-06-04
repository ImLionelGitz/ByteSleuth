export default function exportJson(rows: TableByte[]) {
   const blob = new Blob([JSON.stringify(rows, null, 2)], {
      type: 'application/json',
   })

   const url = URL.createObjectURL(blob)

   const a = document.createElement('a')
   a.href = url
   a.download = 'data.json'
   a.click()

   URL.revokeObjectURL(url)
}
