import { saveFields } from '@/helpers/datastores/fieldDatabase'

export type Action =
   | { type: 'ADD' }
   | { type: 'LOAD'; payload: FieldByte[] }
   | { type: 'UPDATE'; payload: FieldByte }
   | { type: 'DELETE'; payload: number }
   | { type: 'SELECTOR_FOUND'; payload: { id: number; selector: string } }

export default function fieldReducer(state: FieldByte[], action: Action) {
   switch (action.type) {
      case 'ADD': {
         const getName = () => {
            const existNames = state.map((f) => f.name)
            let name = 'New Field'
            let i = 1

            while (existNames.includes(name)) {
               name = `New Field ${i}`
               i++
            }

            return name
         }

         const getId = () => {
            const existIds = state.map((f) => f.id)
            let i = 1

            while (existIds.includes(i)) {
               i++
            }

            return i
         }

         const newField: FieldByte = {
            id: getId(),
            name: getName(),
            selector: '',
         }

         const arr = [...state, newField]

         saveFields(arr)
         return arr
      }

      case 'UPDATE': {
         const arr = state.map((f) => {
            if (f.id === action.payload.id) return action.payload
            else return f
         })

         saveFields(arr)
         return arr
      }

      case 'DELETE': {
         console.log(action.payload)

         const arr = state.filter((field) => field.id !== action.payload)

         saveFields(arr)
         return arr
      }

      case 'SELECTOR_FOUND': {
         const { id, selector } = action.payload

         return state.map((f) => {
            if (f.id === id) return { ...f, selector: selector }
            else return f
         })
      }

      case 'LOAD':
         saveFields(action.payload)
         return action.payload

      default:
         return state
   }
}
