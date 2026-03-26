export default class SelectManager {
   private lastEl: HTMLElement | null
   private overlay: HTMLElement

   constructor() {
      this.overlay = document.createElement('div')
      this.lastEl = null

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

   enableSelection() {
      this.overlay.style.display = 'block'
   }

   disableSelection() {
      this.overlay.style.display = 'none'
   }

   private handleClick = () => {
      console.log(this.lastEl)
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
