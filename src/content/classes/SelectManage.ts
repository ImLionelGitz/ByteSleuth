import { cross } from '@/Messages'
import getSmartSelector from '@/popup/helpers/selector'
import { CrossData, EntryBit, LocalData } from '@/Types'
import { TableFields } from '@/Vars'

export default class SelectManager {
   private lastEl: HTMLElement | null
   private overlay: HTMLElement
   private curFieldID: number | null
   private nxtSelection: boolean

   isSelecting: boolean

   constructor() {
      this.overlay = document.createElement('div')
      this.lastEl = null
      this.curFieldID = null
      this.isSelecting = false
      this.nxtSelection = false

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

   enableNxtSelect() {
      this.isSelecting = true
      this.overlay.style.display = 'block'
      this.nxtSelection = true
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

         if (!this.nxtSelection)
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
         else {
            const msg: CrossData = { type: 'SAVE_MULTIPAGE', payload: selector }

            chrome.runtime.sendMessage(msg, (res: string) => {
               if (res === cross.DONE_NXT_SAVE) {
                  window.postMessage(data, window.location.origin)
               }
            })
         }
      }

      // document.querySelectorAll(selector).forEach((match) => {
      //    const el = match as HTMLElement
      //    el.style.outline = '2px solid blue'
      // })
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
