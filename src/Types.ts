export interface EntryBit {
   id: number
   name: string
   selector: string
}

export interface TableData {
   title: string
   data: string[]
}

export type LocalData =
   | { type: 'BEGIN_SELECTION'; payload: number }
   | { type: 'SELECTOR_FOUND' }
