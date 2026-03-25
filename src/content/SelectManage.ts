export default class SelectManager {
   private selecting = false
   private lastEl: HTMLElement | null
   private styleEl: HTMLStyleElement | null

   constructor() {
      //this.selecting = false
      this.lastEl = null
      this.styleEl = null
   }

   init() {
      // document.addEventListener('click', this.handleClick, { capture: true })
      // document.addEventListener('mousedown', this.blockClick, { capture: true })
      // document.addEventListener('mouseup', this.blockClick, { capture: true })
      // document.addEventListener('mouseover', this.handleOver, { capture: true })
   }

   enableSelection() {
      this.selecting = true

      // this.styleEl = document.createElement('style')
      // this.styleEl.innerHTML = `* { cursor: crosshair !important; }`
      // document.head.appendChild(this.styleEl)

      // document.body.style.pointerEvents = 'none'
      this.addOverlay()
   }

   disableSelection() {
      this.selecting = false
      this.styleEl?.remove()
   }

   private addOverlay() {
      const overlay = document.createElement('div')

      overlay.style.position = 'fixed'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.zIndex = '999999'
      overlay.style.background = 'transparent'
      overlay.style.cursor = 'crosshair'

      overlay.addEventListener('mousemove', this.handleOver)
      overlay.addEventListener('click', this.handleClick)

      document.body.appendChild(overlay)
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
