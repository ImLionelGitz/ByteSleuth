import initialize from './init'
import setupListeners from './listeners'

export default defineContentScript({
   matches: ['https://www.amazon.co.uk/*'],

   main(ctx) {
      const iframe = initialize(ctx)
      setupListeners(iframe)
   },
})
