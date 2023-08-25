import { queueForSaving, clearSaveQueue } from "./globals"

export function Inject() {
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.height = '0'
    iframe.style.zIndex = '9999'
    iframe.style.border = '0'
    iframe.style.width = '100%'
    iframe.style.transition = '0.2s ease-out'
    iframe.src = chrome.runtime.getURL('popup.html')

    document.documentElement.prepend(iframe)

    return iframe
}

export function ToggleDocBody(hide: boolean) {
    if (hide) document.body.style.display = 'none'
    else document.body.style.display = 'block'
}

export function isDocBodyVisible() {
    if (document.body.style.display == 'block') return true
    else return false
}

export function CloneDocBody() {
    const cloned = document.body.cloneNode(true) as HTMLElement

    cloned.style.userSelect = 'none'
    document.documentElement.appendChild(cloned)

    return cloned
}

export function AddListeners(object: Element, listeners: Array<keyof HTMLElementEventMap>, callbacks: EventListenerOrEventListenerObject[], capture?: boolean) {
    listeners.forEach((listener, index) => {
        const actualIndex = callbacks[index] ? index : callbacks.length
        object.addEventListener(listener, callbacks[actualIndex], capture)
    })
}

export async function LoadUserThemeSettings() {
    const data = await chrome.storage.sync.get(['bgcolor', 'btncolor', 'btnhover', 'txtcolor', 'hlcolor']),
    theme: Record<string, string> = {
        bgcolor: data.bgcolor || '#6722a3',
        btncolor: data.btncolor || '#10aa1f',
        btnhover: data.btnhover || '#218a2b',
        txtcolor: data.txtcolor || '#fff',
        hlcolor: data.hlcolor || '#10aa1f'
    }

    return theme
}

export async function SaveSetting(btn: HTMLButtonElement) {
    if (queueForSaving.length > 0) {
        btn.disabled = true
        btn.innerText = 'Saving...'

        for (let i = 0; i < queueForSaving.length; i++) {
            const data = queueForSaving[i];
            await chrome.storage.sync.set(data)
        }
        
        clearSaveQueue()

        btn.innerText = 'Save'
        btn.disabled = false
    }
}

export async function ResetSettings(btn: HTMLButtonElement) {
    btn.disabled = true
    btn.innerText = 'Reseting...'
    await chrome.storage.sync.clear()
    btn.disabled = false
    btn.innerText = 'Reset'

    location.reload()
}