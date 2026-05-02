import { type ContentScriptContext } from '#imports'

export default function initialize(ctx: ContentScriptContext) {
   const ui = createIntegratedUi(ctx, {
      position: 'modal',
      anchor: 'body',
      append: 'first',

      onMount(wrapper) {
         wrapper.style.position = 'fixed'
         wrapper.style.width = '100%'
         wrapper.style.height = '100%'
         wrapper.style.zIndex = '999'
         wrapper.style.pointerEvents = 'none'
      },
   })

   ui.mount()

   return ui.wrapper
}
