interface FieldByte {
   id: number
   name: string
   selector: string
}

interface Script {
   id: number
   linkedIDs: number[]
   code: string
}

interface BoxCoords {
   x: number
   y: number
   width: number
   height: number
}

interface MouseCoords {
   cursorX: number
   cursorY: number
}

type TableByte = Record<string, string>
type CtxAction =
   | 'COPY'
   | 'CUT'
   | 'PASTE'
   | 'FORMAT'
   | 'LINK'
   | 'RESET'
   | 'SAVE'
   | 'OPEN'
   | 'EXAMPLES'
type ExportOptions = 'JSON' | 'CSV' | 'XLSX' | 'Copy to JSON' | 'Copy to CSV'

// Events

type ContentMessages = { message: 'selection cancelled' | 'are u there' }

type BGMessages =
   | { message: 'select an element'; fieldId: number }
   | { message: 'error occured'; err: string }
   | { message: 'scrape'; fields: FieldByte[] }

type Events =
   | { message: 'box delivery'; boxes: BoxCoords[] }
   | { message: 'block clicks' | 'unblock clicks' | 'terminate' }
   | { message: 'sample row container'; rowField: FieldByte }
