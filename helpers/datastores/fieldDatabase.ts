import { MAX_ALLOWED_FIELDS, ROW_CONT_LOGIC } from '../vars'

interface RawFieldByte {
   id: number
   name: string
}

//const MAX_ALLOWED_BYTES = 1 * 1024

const fieldDB = storage.defineItem<RawFieldByte[]>('local:fields', {
   fallback: [],
})

async function fieldQuotaFull() {
   const items = await fieldDB.getValue()
   const percent = items.length / MAX_ALLOWED_FIELDS

   if (percent <= 0.9) return false
   else return true
}

async function loadFields(): Promise<FieldByte[]> {
   const raw = await fieldDB.getValue()

   const defField: FieldByte = {
      id: ROW_CONT_LOGIC,
      name: 'Row Container',
      selector: '',
   }

   return [...raw.map((f) => ({ ...f, selector: '' })), defField]
}

function saveFields(list: FieldByte[]) {
   const refined = list.map((f) => ({ id: f.id, name: f.name }))
   fieldDB.setValue(refined.filter((f) => f.id !== ROW_CONT_LOGIC))
}

export { fieldQuotaFull, loadFields, saveFields }
