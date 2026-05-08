import { generateSelectors } from '@/entrypoints/content/helpers/selector'

export default class SelectManager {
   private overlayEl: HTMLElement
   private packedSelect: string
   private cb: (s: string) => void

   isSelecting: boolean

   constructor(overlay: HTMLElement, onFound: (s: string) => void) {
      this.isSelecting = false
      this.packedSelect = ''

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

   private changeSelector(newSelector: string) {
      if (this.packedSelect === newSelector) return

      this.toggleHighligts(false)
      this.packedSelect = newSelector
      this.toggleHighligts(true)
   }

   private clearSelector() {
      this.toggleHighligts(false)
      this.packedSelect = ''
   }

   private toggleHighligts(highlight: boolean) {
      if (!this.packedSelect) return

      const allEls = document.querySelectorAll<HTMLElement>(this.packedSelect)

      allEls.forEach((el) => {
         el.style.outline = highlight ? '2px solid #007bff' : ''
         el.style.outlineOffset = highlight ? '-2px' : ''
      })
   }

   private handleClick = () => {
      if (this.packedSelect) {
         this.disableSelection()
         this.cb(this.packedSelect)
         this.clearSelector()
      }
   }

   private handleOver = (e: MouseEvent) => {
      this.overlayEl.style.pointerEvents = 'none'

      const elementUnder = document.elementFromPoint(
         e.clientX,
         e.clientY
      ) as HTMLElement

      this.overlayEl.style.pointerEvents = 'auto'

      if (elementUnder && elementUnder !== document.body) {
         const selector = generateSelectors(elementUnder)
         this.changeSelector(selector)
      }
   }
}
