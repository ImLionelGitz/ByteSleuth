interface FieldByte {
   id: number
   name: string
   selector: string
}

type TableByte = Record<string, string>

interface BoxCoords {
   x: number
   y: number
   width: number
   height: number
}

// Events

type Messages =
   | {
        message:
           | 'select an element'
           | 'selection cancelled'
           | 'window minimize'
           | 'window return'
           | 'give data'
     }
   | { message: 'begin scrape' | 'save data'; list: FieldByte[] }
   | { message: 'error occured'; err: string }

type Events = { message: 'selection ongoing' | 'selection done' }
