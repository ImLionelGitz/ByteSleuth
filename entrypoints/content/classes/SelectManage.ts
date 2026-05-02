import getSmartSelector from '@/entrypoints/content/helpers/selector'

export default class SelectManager {
   private hoverEl: HTMLElement | null
   private overlayEl: HTMLElement
   private cb: (s: string) => void

   isSelecting: boolean

   constructor(overlay: HTMLElement, onFound: (s: string) => void) {
      this.hoverEl = null
      this.isSelecting = false

      this.overlayEl = overlay
      this.cb = onFound
   }

   enableSelection() {
      this.overlayEl.style.pointerEvents = 'all'
      this.overlayEl.style.cursor = 'crosshair'
      this.overlayEl.addEventListener('mousemove', this.handleOver)
      this.overlayEl.addEventListener('click', this.handleClick)
   }

   disableSelection() {
      this.overlayEl.removeEventListener('mousemove', this.handleOver)
      this.overlayEl.removeEventListener('click', this.handleClick)
      this.overlayEl.style.cursor = 'default'
      this.overlayEl.style.pointerEvents = 'none'
   }

   private handleClick = () => {
      if (this.hoverEl) {
         const selector = getSmartSelector(this.hoverEl)

         this.hoverEl.style.outline = ''
         this.hoverEl = null

         this.disableSelection()
         this.cb(selector)
      }
   }

   private handleOver = (e: MouseEvent) => {
      this.overlayEl.style.pointerEvents = 'none'

      const elementUnder = document.elementFromPoint(
         e.clientX,
         e.clientY
      ) as HTMLElement

      this.overlayEl.style.pointerEvents = 'auto'

      if (
         elementUnder &&
         elementUnder !== this.hoverEl &&
         elementUnder !== document.body
      ) {
         if (this.hoverEl) this.hoverEl.style.outline = ''

         this.hoverEl = elementUnder
         elementUnder.style.outline = '2px solid #007bff'
         elementUnder.style.outlineOffset = '-2px'
      }
   }
}
