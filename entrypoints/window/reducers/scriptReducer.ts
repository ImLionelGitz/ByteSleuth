type Action =
   | { type: 'ADD'; payload: Script }
   | { type: 'UPDATE'; id: number; payload: Script }
   | { type: 'LOAD'; payload: Script[] }
   | { type: 'DELETE'; payload: number }

export default function scriptReducer(state: Script[], action: Action) {
   switch (action.type) {
      case 'ADD': {
         const arr = [...state, action.payload]
         //saveScripts(arr) --don't do this now
         console.log(arr)
         return arr
      }

      case 'UPDATE': {
         const arr = state.map((script) => {
            if (script.linkedIDs.includes(action.id)) {
               return action.payload
            }

            return script
         })

         //saveScripts(arr) --don't do this now
         console.log(arr)
         return arr
      }

      case 'LOAD': {
         //saveScripts(action.payload) --don't do this now
         return action.payload
      }

      case 'DELETE': {
         const arr = state.filter(
            (script) =>
               !script.linkedIDs.includes(action.payload) &&
               script.linkedIDs.length === 1
         )

         //saveScripts(arr)
         return arr
      }

      default:
         return state
   }
}
