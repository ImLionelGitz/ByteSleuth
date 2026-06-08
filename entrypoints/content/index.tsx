import { createRoot } from 'react-dom/client'
import Hud from './Hud'

export default defineContentScript({
   matches: import.meta.env.DEV
      ? [
           'https://www.amazon.co.uk/*',
           'https://polyhaven.com/*',
           'https://idlc.com/*',
        ]
      : ['<all_urls>'],

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
   },
})
