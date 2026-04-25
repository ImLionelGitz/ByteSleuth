interface SleuthInfo {
   main_selector: string
   fields: FieldByte[]
}

interface FieldByte {
   name: string
   selector: string
}

type TableByte = Record<string, string>
