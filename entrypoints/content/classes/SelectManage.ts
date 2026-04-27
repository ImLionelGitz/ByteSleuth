import getSmartSelector from '@/entrypoints/content/helpers/selector'

export default class SelectManager {
   private hoverEl: HTMLElement | null
   private mainEl: HTMLElement | null
   private firstTime: boolean

   isSelecting: boolean

   constructor() {
      this.hoverEl = null
      this.mainEl = null
      this.isSelecting = false
      this.firstTime = true

      // this.overlay.style.display = 'none'

      // this.overlay.addEventListener('mousemove', this.handleOver)
      // this.overlay.addEventListener('click', this.handleClick)
   }

   enableFirstSelection(overlay: HTMLElement) {
      if (!this.firstTime) return

      overlay.style.pointerEvents = 'all'
      overlay.style.cursor = 'crosshair'

      overlay.addEventListener('mousemove', this.handleOver)
      overlay.addEventListener('click', this.handleClick)
      this.mainEl = overlay
   }

   enableSelection() {
      if (!this.mainEl) return

      this.mainEl.style.pointerEvents = 'all'
      this.mainEl.style.cursor = 'crosshair'
   }

   private disableSelection(first = false) {
      if (!this.mainEl) return

      if (first) {
         this.mainEl.removeEventListener('mousemove', this.handleOver)
         this.mainEl.removeEventListener('click', this.handleClick)
         this.mainEl.style.cursor = 'default'
         this.mainEl = null
      }
   }

   private handleClick = () => {
      if (this.hoverEl) {
         if (this.firstTime) {
            this.firstTime = false
            this.disableSelection(true)
         } else {
            this.disableSelection()
         }

         const selector = getSmartSelector(this.hoverEl)
         const msg: Messages = {
            message: 'core data found',
            data: selector,
         }

         this.hoverEl.style.outline = ''
         this.hoverEl.style.position = 'relative'
         this.hoverEl.style.backgroundColor = 'aliceblue'
         this.hoverEl.style.mixBlendMode = 'difference'

         this.mainEl = this.hoverEl
         this.hoverEl = null

         browser.runtime.sendMessage(msg)
      }
   }

   private handleOver = (e: MouseEvent) => {
      if (!this.mainEl) return

      this.mainEl.style.pointerEvents = 'none'

      const elementUnder = document.elementFromPoint(
         e.clientX,
         e.clientY
      ) as HTMLElement

      this.mainEl.style.pointerEvents = 'auto'

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
