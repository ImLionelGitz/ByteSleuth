type Action =
   | { type: 'SAVE'; payload: Script }
   | { type: 'LOAD'; payload: Script[] }
   | { type: 'DELETE'; payload: number }

export default function scriptReducer(state: Script[], action: Action) {
   switch (action.type) {
      case 'SAVE':
      case 'LOAD':
      case 'DELETE':
      default:
         return state
   }
}
