import { createRoot } from 'react-dom/client'
import setupListeners from './listeners'
import Hud from './Hud'

export default defineContentScript({
   matches: [
      'https://www.amazon.co.uk/*',
      'https://polyhaven.com/*',
      'https://idlc.com/*',
      'https://monkeytype.com/*',
   ],

   async main(ctx) {
      const ui = await createShadowRootUi(ctx, {
         name: 'selector-hud',
         position: 'overlay',
         anchor: 'body',
         append: 'first',
         onMount: (container) => {
            container.style.margin = '0'

            const root = createRoot(container)
            root.render(<Hud />)
            return root
         },
         onRemove: (root) => {
            root?.unmount()
         },
      })

      ui.mount()

      setupListeners(ui.uiContainer)
   },
})
