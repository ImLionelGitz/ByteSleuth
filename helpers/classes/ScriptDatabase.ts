import { Dexie, type Table } from 'dexie'

export default class ScriptDatabase extends Dexie {
   scripts!: Table<Script, number>

   constructor() {
      super('ScriptDatabase')

      this.version(1).stores({
         scripts: 'id, *linkedIDs',
      })
   }
}
