import { type ContentScriptContext } from '#imports'

export default async function initialize(ctx: ContentScriptContext) {
   const ui = await createIframeUi(ctx, {
      page: '/barrier.html',
      position: 'modal',
      anchor: 'body',
      append: 'after',

      onMount(_, iframe) {
         iframe.style.border = 'none'
         iframe.style.width = '100%'
         iframe.style.height = '100%'
         iframe.style.zIndex = '999'
      },
   })

   ui.mount()
}
