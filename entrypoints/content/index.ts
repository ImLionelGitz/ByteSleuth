import initialize from './init'

export default defineContentScript({
   matches: ['https://www.amazon.co.uk/*'],
   cssInjectionMode: 'ui',

   main(ctx) {
      initialize(ctx)
   },
})
