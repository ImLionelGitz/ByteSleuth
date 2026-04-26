import getSmartSelector from '@/entrypoints/content/helpers/selector'

export default class SelectManager {
   private lastEl: HTMLElement | null
   private overlay: HTMLElement
   private curFieldID: number | null

   isSelecting: boolean

   constructor(overlay: HTMLElement) {
      this.overlay = overlay
      this.lastEl = null
      this.curFieldID = null
      this.isSelecting = false

      this.overlay.style.display = 'none'

      this.overlay.addEventListener('mousemove', this.handleOver)
      this.overlay.addEventListener('click', this.handleClick)
   }

   enableSelection(fieldID: number) {
      this.isSelecting = true
      this.overlay.style.display = 'block'
      this.overlay.style.cursor = 'crosshair'
      this.curFieldID = fieldID
   }

   disableSelection() {
      this.overlay.style.display = 'none'
      this.overlay.style.cursor = 'normal'
      this.curFieldID = null
      this.isSelecting = false
   }

   private handleClick = () => {
      if (this.lastEl) {
         const selector = getSmartSelector(this.lastEl)

         this.lastEl.style.outline = ''
         this.lastEl = null

         console.log(selector)
      }
   }

   private handleOver = (e: MouseEvent) => {
      console.log('lolol')
      this.overlay.style.pointerEvents = 'none'

      const elementUnder = document.elementFromPoint(
         e.clientX,
         e.clientY
      ) as HTMLElement

      this.overlay.style.pointerEvents = 'auto'

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
