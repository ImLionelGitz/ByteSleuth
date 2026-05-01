type Ping = (msg: Events) => void

function pinger(cb: Ping) {
   window.addEventListener('message', (e) => {
      if (e.origin === window.location.origin) {
         cb(e.data)
      }
   })
}

function transmit(msg: Events) {
   window.postMessage(msg, window.location.origin)
}

export { pinger, transmit }
