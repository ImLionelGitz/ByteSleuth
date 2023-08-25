import './public/index.scss'
import './public/alwan.min.css'
import './public/tagger.css'
import './public/fontawesome.css'

import { Inject, CloneDocBody, ToggleDocBody, AddListeners } from './helpers/helpers'
import { HighlighterVariable } from './helpers/globals'

const iframe = Inject(),
RealBody = document.body

let activeUI = false,
SelectionInit = false,
DummyBody: HTMLElement | null,
highlightedElement: HTMLElement | null

chrome.runtime.onMessage.addListener((message) => {
    if (message.name == 'UI') {
        if (!activeUI) {
            activeUI = true
            RealBody.style.pointerEvents = 'none'

            if (SelectionInit) {
                const hlColor = message.color
                RealBody.style.pointerEvents = 'auto'

                DummyBody = CloneDocBody()
                DummyBody.style.setProperty(HighlighterVariable, hlColor)
                ToggleDocBody(true)
                AddListeners(DummyBody, ['dragstart', 'drop'], [Disable])
                AddListeners(DummyBody, ['mousemove', 'click'], [onMouseMove, onMouseClick])

                RealBody.style.pointerEvents = 'none'
            }

            else iframe.style.height = '148px'
        }

        else {
            RealBody.style.pointerEvents = 'auto'

            if (SelectionInit && DummyBody) {
                DummyBody.remove()
                DummyBody = null
                ToggleDocBody(false)
            }

            else iframe.style.height = '0'

            activeUI = false
        }
    }

    if (message.name == 'ElmBtnInvoke') {
        const hlColor = message.color
        RealBody.style.pointerEvents = 'auto'
        iframe.style.display = 'none'

        DummyBody = CloneDocBody()
        DummyBody.style.setProperty(HighlighterVariable, hlColor)
        ToggleDocBody(true)
        AddListeners(DummyBody, ['dragstart', 'drop'], [Disable])
        AddListeners(DummyBody, ['mousemove', 'click'], [onMouseMove, onMouseClick])

        SelectionInit = true
    }

    if (message.name == 'CancelSelection') {
        RealBody.style.pointerEvents = 'none'

        if (DummyBody) {
            DummyBody.remove()
            highlightedElement = null
            DummyBody = null
            ToggleDocBody(false)
        }

        SelectionInit = false

        iframe.style.display = 'block'
    }
})

// Not the main area

function onMouseMove(event: Event) {
    if (highlightedElement) {
        highlightedElement.style.outline = 'none'
    }

    const targetElement = event.target as HTMLElement | null
    if (
        targetElement &&
        targetElement != document.documentElement &&
        targetElement != DummyBody
    ) {
        highlightedElement = targetElement
        targetElement.removeAttribute('title')
        targetElement.style.outline = `3px solid var(${HighlighterVariable})`
    }
}

function onMouseClick(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    if (highlightedElement) {
        const dataToSend = highlightedElement.outerHTML.substring(0, 20)

        chrome.runtime.sendMessage({ name: 'PassElemForView', data: dataToSend }, () => {
            if (DummyBody) {
                RealBody.style.pointerEvents = 'none'
                iframe.style.display = 'block'
                DummyBody.remove()
                highlightedElement = null
                DummyBody = null
                SelectionInit = false
                ToggleDocBody(false)
            }
        })
    }
}

function Disable(e: Event) {
    e.preventDefault()
    e.stopPropagation()

    return false
}