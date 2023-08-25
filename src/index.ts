import './index2'
import { LoadUserThemeSettings } from './helpers/helpers'
import { ColorPalettes, HighlighterVariable } from './helpers/globals'

const versionDisplay = document.getElementById('version'),
elementDisplay = document.getElementById('element')

const elementButton = document.getElementById('elementButton') as HTMLButtonElement | null,
scrapeButton = document.getElementById('scrapeButton') as HTMLButtonElement | null,
settingsButton = document.getElementById('settingsButton') as HTMLButtonElement | null

const container = document.getElementsByClassName('ScraperContainer')[0] as HTMLElement | null

if (container) {
    const body = document.body,
    PaletteData = ColorPalettes(false)

    LoadUserThemeSettings().then(data => {
        Object.keys(PaletteData).forEach(key => {
            const value = PaletteData[key]
            body.style.setProperty(value.key, data[key])
        })
    })

    let cancelEnable = false

    if (versionDisplay) {
        const version = chrome.runtime.getManifest().version
        versionDisplay.innerText = `v${version}`
    }

    if (settingsButton && elementButton) {
        settingsButton.addEventListener('pointerup', () => {
            chrome.runtime.openOptionsPage(() => {
                if (chrome.runtime.lastError) {
                    settingsButton.disabled = true
                    settingsButton.style.border = '#ca1616 solid 3px'

                    setTimeout(() => {
                        settingsButton.removeAttribute('style')
                        settingsButton.disabled = false
                    }, 200)
                }
            })
        })

        elementButton.addEventListener('pointerup', () => {
            if (!cancelEnable) {
                chrome.runtime.sendMessage({ name: 'ElmBtnClick', color: body.style.getPropertyValue(HighlighterVariable) }, () => {
                    cancelEnable = true
                })
            }
        })

        document.addEventListener('keyup', (e) => {
            e.preventDefault()
            e.stopPropagation()

            if (e.key == 'e' && cancelEnable) {
                chrome.runtime.sendMessage({ name: 'SelectionCanceled' }, () => {
                    cancelEnable = false
                })
            }
        }, true)
    }

    chrome.runtime.onMessage.addListener((message) => {
        if (message.name == 'DataIncoming') {
            const data = message.data

            if (elementDisplay && elementButton && scrapeButton && settingsButton) {
                elementDisplay.innerText = data

                elementButton.innerText = 'Select Element'
                elementButton.removeAttribute('style')
                cancelEnable = false
                elementButton.disabled = false
                scrapeButton.disabled = false
                settingsButton.disabled = false
            }
        }
    })
}