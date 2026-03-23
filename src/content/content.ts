import { HIDE_CONTENT } from '@/Messages'
import Init from './IframeManage'

const mgr = Init()

chrome.runtime.onMessage.addListener((msg) => {
   if (msg === HIDE_CONTENT) {
      mgr.coverUP()
   }
})

// chrome.action.onClicked.addListener(() => {
//    console.log('lol')
// })

// let selecting = false

// const handleClick = (e: MouseEvent) => {
//    if (!selecting) return

//    e.preventDefault()
//    e.stopPropagation()
//    e.stopImmediatePropagation()

//    const el = e.target as HTMLElement
//    console.log('Selected:', el)
// }

// document.addEventListener('click', handleClick, true)
// document.addEventListener('mousedown', handleClick, true)
// document.addEventListener('mouseup', handleClick, true)

// let lastEl: HTMLElement | null = null

// document.addEventListener('mouseover', (e) => {
//    if (!selecting) return

//    const el = e.target as HTMLElement

//    if (lastEl) lastEl.style.outline = ''
//    el.style.outline = '2px solid red'

//    lastEl = el
// })

// let styleEl: HTMLStyleElement | null = null

// function enableSelectionCursor() {
//    styleEl = document.createElement('style')
//    styleEl.innerHTML = `* { cursor: crosshair !important; }`
//    document.head.appendChild(styleEl)
// }

// function disableSelectionCursor() {
//    styleEl?.remove()
// }

// chrome.runtime.onMessage.addListener((msg) => {
//    if (msg.type === 'START_SELECTION') {
//       selecting = true
//       enableSelectionCursor()
//    }
// })

console.log('Content script loaded')
