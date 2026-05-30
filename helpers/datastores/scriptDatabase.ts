import ScriptDatabase from '../classes/ScriptDatabase'

export const db = new ScriptDatabase()

async function saveScript(script: Script) {
   const { id, linkedIDs, code } = script

   if (!linkedIDs.length) {
      // If it has an ID, delete it
      await db.scripts.delete(id)
      console.log('deleted')
      return
   }

   if (!code) return

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

async function deleteScript(discardID: number) {
   // 1. Find the script using the deleted field's ID as the primary key
   const script = await db.scripts.where('linkedIDs').equals(discardID).first()

   // If this field didn't have a script attached, do nothing
   if (!script) return

   // 2. Filter out the deleted field ID from the linked list
   const remainingLinks = script.linkedIDs.filter((id) => id !== discardID)

   if (!remainingLinks.length) {
      db.scripts.delete(script.id)
      return
   }

   const newPrimaryId = remainingLinks[0]

   if (script.id === discardID) {
      await db.scripts.add({
         ...script,
         id: newPrimaryId,
         linkedIDs: remainingLinks,
      })

      await db.scripts.delete(discardID)
   } else {
      await db.scripts.update(script.id, {
         ...script,
         linkedIDs: remainingLinks,
      })
   }

   // 3. Check if there are any remaining linked fields
   // if (remainingLinks.length > 0) {
   //    // Pick the first remaining ID to become the new primary ID

   //    // 4. Create the new record copy with the updated primary key and array
   //    await db.scripts.add({
   //       ...script,
   //       id: newPrimaryId,
   //       linkedIDs: remainingLinks,
   //    })

   //    // 5. Delete the old record safely
   //    await db.scripts.delete(discardID)
   // } else {
   //    // 6. No fields are linked anymore -> completely delete the script
   //    await db.scripts.delete(discardID)
   // }
}

// Returns the raw promise chain that useLiveQuery needs to track updates
function giveAllScripts() {
   return db.scripts.toArray()
}

export { giveAllScripts, giveScript, saveScript, deleteScript }
