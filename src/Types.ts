export interface EntryBit {
   id: number
   name: string
   selector: string
}

export interface TableData {
   title: string
   data: string[]
}

export interface MultiLookData {
   enabled: boolean
   maxPages: number
   nextBtn: string
}

export type LocalData =
   | { type: 'BEGIN_SELECTION'; payload: number }
   | { type: 'SELECTOR_FOUND' }
   | { type: 'START_SCRAPE' }
   | { type: 'SELECT_NXT_BTN' }

export type CrossData = { type: 'SAVE_MULTIPAGE'; payload: string }
