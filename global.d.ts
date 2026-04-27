interface SleuthInfo {
   main_selector: string
   fields: FieldByte[]
}

interface FieldByte {
   name: string
   selector: string
}

type TableByte = Record<string, string>

type Messages =
   | { message: 'select a root' | 'hide window' }
   | { message: 'core data found' | 'data found'; data: string }
