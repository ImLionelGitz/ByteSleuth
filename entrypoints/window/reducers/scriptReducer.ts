import { saveScripts } from '@/helpers/datastores/scriptDatabase'

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

         if (!linkedIDs.length || !code) {
            if (hasInstance) {
               const modify = state.filter(
                  (src) => !src.linkedIDs.includes(action.id)
               )

               saveScripts(modify)
               return modify
            }

            return state
         }

         const arr = !hasInstance
            ? [...state, action.payload]
            : state.map((src) => {
                 if (src.linkedIDs.includes(action.id)) {
                    return action.payload
                 }

                 return src
              })

         saveScripts(arr)
         return arr
      }

      case 'DELETE': {
         const arr = state.filter(
            (script) =>
               !script.linkedIDs.includes(action.payload) &&
               script.linkedIDs.length === 1
         )

         saveScripts(arr)
         return arr
      }

      case 'LOAD':
         return action.payload

      default:
         return state
   }
}
