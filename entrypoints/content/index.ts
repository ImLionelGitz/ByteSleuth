import initialize from './init'
import setupListeners from './listeners'

export default defineContentScript({
   matches: [
      'https://www.amazon.co.uk/*',
      'https://polyhaven.com/*',
      'https://idlc.com/*',
      'https://monkeytype.com/*',
   ],

   main(ctx) {
      const iframe = initialize(ctx)
      setupListeners(iframe)
   },
})
