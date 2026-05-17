import { saveFields } from '@/helpers/datastores/fieldDatabase'

export type Action =
   | { type: 'LOAD'; payload: FieldByte[] }
   | { type: 'ADD' | 'UPDATE'; payload: FieldByte }
   | { type: 'DELETE'; payload: number }

export default function reducer(state: FieldByte[], action: Action) {
   switch (action.type) {
      case 'UPDATE': {
         const arr = state.map((field) => {
            if (field.id === action.payload.id) {
               return action.payload
            }

            return field
         })

         saveFields(arr)
         return arr
      }

      case 'DELETE': {
         const arr = state
            .filter((field) => field.id !== action.payload)
            .map((field, i) => ({ ...field, id: i }))

         saveFields(arr)
         return arr
      }

      case 'ADD': {
         const arr = [...state, action.payload]
         saveFields(arr)
         return arr
      }

      case 'LOAD':
         saveFields(action.payload)
         return action.payload

      default:
         return state
   }
}
