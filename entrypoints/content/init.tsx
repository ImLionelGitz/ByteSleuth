import { type ContentScriptContext } from '#imports'

export default function initialize(ctx: ContentScriptContext) {
   const ui = createIframeUi(ctx, {
      page: '/barrier.html',
      position: 'modal',
      anchor: 'body',
      append: 'first',

      onMount(wrapper, iframe) {
         iframe.style.border = 'none'
         iframe.style.pointerEvents = 'none'
         iframe.style.width = '100%'
         iframe.style.height = '100%'
         iframe.style.zIndex = '999'

         wrapper.style.position = 'fixed'
         wrapper.style.width = '100%'
         wrapper.style.height = '100%'
         wrapper.style.zIndex = '999'
      },
   })

   ui.mount()

   return ui.wrapper
}
