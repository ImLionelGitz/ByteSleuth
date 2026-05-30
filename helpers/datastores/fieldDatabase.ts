import { useStorage } from '../hooks/useStore'
import { deleteScript } from './scriptDatabase'

const fieldDB = storage.defineItem<FieldByte[]>('local:fields', {
   fallback: [],
})

const useFields = () => useStorage(fieldDB)

async function checkMemoryFull() {
   const quota = 448 //browser.storage.session.QUOTA_BYTES
   const bytesUse = await browser.storage.local.getBytesInUse(null)
   const percent = bytesUse / quota

   if (percent <= 0.9) return false
   else return true
}

async function addField() {
   const fields = await fieldDB.getValue()

   const existNames = fields.map((field) => field.name)
   let name = 'New Field'
   let i = 1

   while (existNames.includes(name)) {
      name = `New Field ${i}`
      i++
   }

   const field: FieldByte = {
      id: fields.length,
      name: name,
      selector: '',
   }

   fieldDB.setValue([...fields, field])
}

async function updateField(field: FieldByte) {
   const fields = await fieldDB.getValue()

   fieldDB.setValue(
      fields.map((f) => {
         if (f.id === field.id) return field
         else return f
      })
   )
}

async function directSaveFields(fields: FieldByte[]) {
   fieldDB.setValue(fields)
}

async function deleteField(id: number) {
   const fields = await fieldDB.getValue()

   fieldDB.setValue(
      fields
         .filter((field) => field.id !== id)
         .map((field, i) => ({ ...field, id: i }))
   )

   await deleteScript(id)
}

export {
   directSaveFields,
   checkMemoryFull,
   deleteField,
   addField,
   updateField,
   useFields,
}
