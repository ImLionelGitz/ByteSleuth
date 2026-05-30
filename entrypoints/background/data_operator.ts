import ScriptDatabase from '@/helpers/classes/ScriptDatabase'

const db = new ScriptDatabase()

async function getScriptByID(id: number) {
   return await db.scripts.where('linkedIDs').equals(id).first()
}

async function saveScript(script: Script) {
   const { id, linkedIDs, code } = script

   if (!linkedIDs.length || !code) {
      await db.scripts.delete(id)
      return
   }

   const exists = await db.scripts.where('linkedIDs').equals(id).first()

   if (exists) await db.scripts.update(id, { linkedIDs, code })
   else await db.scripts.add(script)
}

export { getScriptByID, saveScript }
