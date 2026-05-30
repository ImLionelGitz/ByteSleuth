import ScriptDatabase from '../classes/ScriptDatabase'

export const db = new ScriptDatabase()

async function saveScript(script: Script) {
   const { id, linkedIDs, code } = script

   if (!linkedIDs.length || !code) {
      // If it has an ID, delete it
      await db.scripts.delete(id)
      console.log('deleted')
      return
   }

   // Find if it exists by linkedIDs
   const exists = await db.scripts.where('linkedIDs').equals(id).first()

   if (exists) {
      // Use the existing record's primary key to update it
      await db.scripts.update(exists.id, { linkedIDs, code })
      console.log('updated')
   } else {
      await db.scripts.add(script)
      console.log('added')
   }
}

async function giveScript(id: number) {
   return await db.scripts.where('linkedIDs').equals(id).first()
}

// Returns the raw promise chain that useLiveQuery needs to track updates
function giveAllScripts() {
   return db.scripts.toArray()
}

export { giveAllScripts, giveScript, saveScript }
