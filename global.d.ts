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
type CtxAction = 'COPY' | 'CUT' | 'PASTE' | 'FORMAT' | 'LINK'

// Events

type ContentMessages =
   | { message: 'selection cancelled' }
   | { message: 'error occured'; err: string }

type BGMessages =
   | { message: 'give script'; id: number }
   | { message: 'save script'; script: Script }
   | { message: 'begin scrape' }
   | { message: 'select an element'; fieldId: number }

type Events =
   | { message: 'box delivery'; boxes: BoxCoords[] }
   | { message: 'block clicks' | 'unblock clicks' | 'terminate' }
