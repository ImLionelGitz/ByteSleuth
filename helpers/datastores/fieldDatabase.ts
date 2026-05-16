import { sendToBackground } from '../messager'

async function getFields() {
   return await sendToBackground<FieldByte[]>({ message: 'give data' })
}

function saveFields(list: FieldByte[]) {
   sendToBackground({ message: 'save data', list: list })
}

async function checkMemoryFull() {
   const quota = 448 //browser.storage.session.QUOTA_BYTES
   const bytesUse = await browser.storage.session.getBytesInUse(null)
   const percent = bytesUse / quota

   console.log(bytesUse)

   if (percent <= 0.9) return false
   else return true
}

export { getFields, saveFields, checkMemoryFull }
