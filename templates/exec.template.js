// Wrap everything in an immediately-invoked function expression (IIFE)
// that evaluates to a Promise. This is what execute() will receive.
(() => {
   window.postMessage({ message: 'block clicks' })

   return new Promise((resolve) => {
      // The event handler function
      var curSelector = ''

      function onMouseMove(e) {
         var allEls = document.elementsFromPoint(e.x, e.y)
         var elementUnder = allEls.filter(
            (el) => el.tagName.toLowerCase() !== 'selector-hud'
         )[0]

         curSelector = makeSelector(elementUnder) // Your curSelector variable

         if (curSelector) {
            const allEls = document.querySelectorAll(curSelector)

            const boxes = Array.from(allEls).map((el) => {
               const rect = el.getBoundingClientRect()
               return {
                  x: rect.left + window.scrollX,
                  y: rect.top + window.scrollY,
                  width: rect.width,
                  height: rect.height,
               }
            })

            const msg = {
               message: 'box delivery',
               boxes: boxes,
            }

            window.postMessage(msg, window.location.origin)
         }
      }

      function onMouseClick(e) {
         e.preventDefault()
         e.stopPropagation()

         if (curSelector) {
            window.postMessage({ message: 'unblock clicks' })
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('click', onMouseClick, true)
            window.removeEventListener('message', onTerminate)
            resolve(curSelector)
         }
      }

      function onTerminate(e) {
         if (e.data.message === 'terminate') {
            window.postMessage({ message: 'unblock clicks' })
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('click', onMouseClick, true)
            window.removeEventListener('message', onTerminate)
            resolve('')
         }
      
      }

      // Start listening
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('click', onMouseClick, true)
      window.addEventListener('message', onTerminate)
   })
})()
