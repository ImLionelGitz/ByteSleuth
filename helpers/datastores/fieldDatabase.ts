import { ROW_CONT_LOGIC } from '../vars'

interface RawFieldByte {
   id: number
   name: string
}

//const MAX_ALLOWED_BYTES = 1 * 1024

const fieldDB = storage.defineItem<RawFieldByte[]>('local:fields', {
   fallback: [],
})

async function checkMemoryFull() {
   const quota = 70 //browser.storage.session.QUOTA_BYTES
   const items = await fieldDB.getValue()
   const rawStr = JSON.stringify({ raw: items })
   const bytesUse = new Blob([rawStr]).size
   const percent = bytesUse / quota

   console.log(percent, bytesUse)

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

export { checkMemoryFull, loadFields, saveFields }
