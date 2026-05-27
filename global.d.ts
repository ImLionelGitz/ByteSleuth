interface FieldByte {
   id: number
   name: string
   selector: string
}

interface Script {
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
   | { message: 'run user script'; coords: MouseCoords; code: string }
   | { message: 'error occured'; err: string }

type BGMessages =
   | { message: 'window minimize' | 'window return' | 'give data' }
   | { message: 'begin scrape' | 'save data'; list: FieldByte[] }
   | { message: 'select an element'; fieldId: number }

type Events =
   | { message: 'selection ongoing' | 'selection done' }
   | { message: 'context action'; action: CtxAction }
