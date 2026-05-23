type Action =
   | { type: 'SAVE'; id: number; payload: Script }
   | { type: 'LOAD'; payload: Script[] }
   | { type: 'DELETE'; payload: number }

export default function scriptReducer(state: Script[], action: Action) {
   switch (action.type) {
      case 'SAVE': {
         const { linkedIDs, code } = action.payload
         const hasInstance = state.some((src) =>
            src.linkedIDs.includes(action.id)
         )

         console.log(state)

         if (!linkedIDs.length || !code) {
            if (hasInstance) {
               return state.filter((src) => !src.linkedIDs.includes(action.id))
            }

            return state
         }

         return !hasInstance
            ? [...state, action.payload]
            : state.map((src) => {
                 if (src.linkedIDs.includes(action.id)) {
                    return action.payload
                 }

                 return src
              })
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
