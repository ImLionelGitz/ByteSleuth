import getSmartSelector from '@/popup/helpers/selector'
import { EntryBit, LocalData } from '@/Types'
import { TableFields } from '@/Vars'

export default class SelectManager {
   private lastEl: HTMLElement | null
   private overlay: HTMLElement
   private curFieldID: number | null

   isSelecting: boolean

   constructor() {
      this.overlay = document.createElement('div')
      this.lastEl = null
      this.curFieldID = null
      this.isSelecting = false

      this.overlay.style.position = 'fixed'
      this.overlay.style.display = 'none'
      this.overlay.style.top = '0'
      this.overlay.style.left = '0'
      this.overlay.style.border = '0'
      this.overlay.style.width = '100%'
      this.overlay.style.height = '100%'
      this.overlay.style.zIndex = '999999'
      this.overlay.style.cursor = 'crosshair'

      this.overlay.addEventListener('mousemove', this.handleOver)
      this.overlay.addEventListener('click', this.handleClick)
      document.body.appendChild(this.overlay)
   }

   enableSelection(fieldID: number) {
      this.isSelecting = true
      this.overlay.style.display = 'block'
      this.curFieldID = fieldID
   }

   disableSelection() {
      this.overlay.style.display = 'none'
      this.curFieldID = null
      this.isSelecting = false
   }

   private handleClick = () => {
      if (this.lastEl) {
         const selector = getSmartSelector(this.lastEl)

         const data: LocalData = {
            type: 'SELECTOR_FOUND',
         }

         this.lastEl.style.outline = ''
         this.lastEl = null

         chrome.storage.local.get(TableFields, async (res) => {
            const curData = res[TableFields] as EntryBit[]

            const modData = curData.map((d) => {
               if (d.id === this.curFieldID) {
                  return { ...d, selector: selector }
               } else return d
            })

            await chrome.storage.local.set({ [TableFields]: modData })
            window.postMessage(data, window.location.origin)
         })
      }
   }

   private handleOver = (e: MouseEvent) => {
      const overlay = e.currentTarget as HTMLElement

      overlay.style.pointerEvents = 'none'

      const elementUnder = document.elementFromPoint(
         e.clientX,
         e.clientY
      ) as HTMLElement

      overlay.style.pointerEvents = 'auto'

      if (
         elementUnder &&
         elementUnder !== this.lastEl &&
         elementUnder !== document.body
      ) {
         if (this.lastEl) this.lastEl.style.outline = ''

         this.lastEl = elementUnder
         elementUnder.style.outline = '2px solid #007bff'
         elementUnder.style.outlineOffset = '-2px'
      }
   }
}
