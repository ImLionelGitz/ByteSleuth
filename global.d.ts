interface FieldByte {
   id: number
   name: string
   selector: string
   type: FieldTypes
}

type TableByte = Record<string, string>

type FieldTypes = 'TEXT' | 'IMAGE' | 'LINK' | 'EMAIL' | 'PHONE'

type Messages = {
   message: 'select an element' | 'window minimize' | 'window return'
}

type Events =
   | {
        message: 'selection ongoing' | 'selection done'
     }
   | { message: 'error occured'; err: string }
