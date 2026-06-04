import { unparse } from 'papaparse'

export async function copyAsJson(rows: TableByte[]) {
   await navigator.clipboard.writeText(JSON.stringify(rows, null, 2))
}

export async function copyAsCsv(rows: TableByte[]) {
   await navigator.clipboard.writeText(unparse(rows))
}
