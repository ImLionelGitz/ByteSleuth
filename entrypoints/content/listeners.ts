import { receiver } from '@/helpers/messager'
import { pinger, transmit } from '@/helpers/pinger'

export default function setupListeners(
   iframe: HTMLElement,
   boxUpdate: (b: BoxCoords[]) => void
) {
   pinger((msg) => {
      switch (msg.message) {
         case 'box delivery':
            boxUpdate(msg.boxes)
            break

         case 'block clicks':
            iframe.style.pointerEvents = 'all'
            iframe.style.cursor = 'crosshair'
            break

         case 'unblock clicks':
            iframe.style.cursor = 'default'
            iframe.style.pointerEvents = 'none'
            boxUpdate([])
            break
      }
   })

   receiver((msg, _, reply) => {
      switch (msg.message) {
         case 'selection cancelled':
            transmit({ message: 'terminate' })
            break

         case 'are u there':
            reply('yes')
            break

         default:
            break
      }
   })
}
