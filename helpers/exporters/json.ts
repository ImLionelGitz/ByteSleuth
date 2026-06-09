import saveFile from './saveAs'

export default function exportJson(rows: TableByte[]) {
   saveFile({
      content: JSON.stringify(rows, null, 2),
      suggestedName: 'data.json',
      contentType: 'application/json',
      extension: '.json',
      fileDescription: 'JSON File',
   })
}
