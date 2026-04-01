export interface EntryBit {
   id: number
   name: string
   selector: string
   urlOnly: boolean
   regFilter: string
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
   | { type: 'SCRAPE_COMPLETE' | 'DIFF_SCRAPED'; payload: TableData[] }
   | { type: 'OPEN_WINDOW' }
