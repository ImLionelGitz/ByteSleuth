import { generateSelectors } from '@/entrypoints/content/helpers/selector'

export default class SelectManager {
   private overlayEl: HTMLElement
   private packedSelect: string
   private cb: (s: string) => void
   // New callback to send bounding rectangles back to React
   private onHighlightChange: (boxes: BoxCoords[]) => void

   isSelecting: boolean

   constructor(
      overlay: HTMLElement,
      onFound: (s: string) => void,
      onHighlightChange: (boxes: BoxCoords[]) => void
   ) {
      this.isSelecting = false
      this.packedSelect = ''
      this.overlayEl = overlay
      this.cb = onFound
      this.onHighlightChange = onHighlightChange
   }

   enableSelection() {
      this.isSelecting = true
      this.overlayEl.style.pointerEvents = 'all'
      this.overlayEl.style.cursor = 'crosshair'
      this.overlayEl.addEventListener('mousemove', this.handleOver)
      this.overlayEl.addEventListener('click', this.handleClick)
   }

   disableSelection() {
      this.isSelecting = false
      this.overlayEl.removeEventListener('mousemove', this.handleOver)
      this.overlayEl.removeEventListener('click', this.handleClick)
      this.overlayEl.style.cursor = 'default'
      this.overlayEl.style.pointerEvents = 'none'
      this.clearSelector()
   }

   private changeSelector(newSelector: string) {
      if (this.packedSelect === newSelector) return
      this.packedSelect = newSelector
      this.updateHighlights()
   }

   private clearSelector() {
      this.packedSelect = ''
      this.onHighlightChange([]) // Clear boxes in React
   }

   // Calculates page-relative dimensions for Konva
   private updateHighlights() {
      if (!this.packedSelect) {
         this.onHighlightChange([])
         return
      }

      const allEls = document.querySelectorAll<HTMLElement>(this.packedSelect)
      const boxes: BoxCoords[] = []

      allEls.forEach((el) => {
         const rect = el.getBoundingClientRect()
         boxes.push({
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
         })
      })

      this.onHighlightChange(boxes)
   }

   private handleClick = () => {
      if (this.packedSelect) {
         const selection = this.packedSelect
         this.disableSelection()
         this.cb(selection)
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
         elementUnder !== document.body &&
         elementUnder !== document.documentElement
      ) {
         const selector = generateSelectors(elementUnder)
         this.changeSelector(selector)
      }
   }
}
