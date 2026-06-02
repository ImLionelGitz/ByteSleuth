declare interface Field {
   id: number
   name: string
   selector: string
}

declare interface Config {
   rowSelector: string
   fields: Field[]
}

declare type Table = Record<string, string>
