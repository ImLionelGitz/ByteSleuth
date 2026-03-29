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
   collected: TableData[]
}

export type LocalData =
   | { type: 'BEGIN_SELECTION'; payload: number }
   | { type: 'START_SCRAPE' | 'START_COLLECTING' | 'SELECTOR_FOUND' }

export type ChromeData =
   | { type: 'SAVE_COLLECTION'; payload: TableData[] }
   | { type: 'SCRAPE_COMPLETE' }
