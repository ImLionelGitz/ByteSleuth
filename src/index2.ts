import tagger from "@jcubic/tagger";
import tinycolor from 'tinycolor2'
import Alwan from "alwan";

import { LoadUserThemeSettings, SaveSetting, ResetSettings } from "./helpers/helpers";
import { ColorPalettes, queueForSaving } from "./helpers/globals";

const tagInput = document.getElementById('tagInput'),
SaveBtn = document.getElementById('SaveBtn') as HTMLButtonElement | null,
ResetBtn = document.getElementById('ResetBtn') as HTMLButtonElement | null

document.addEventListener('DOMContentLoaded', () => {
    if (tagInput) {
        const PaletteData = ColorPalettes(true),
        root = document.body,
        intensity = 15

        tagger(tagInput, { allow_spaces: false, allow_duplicates: false, link: () => { return false }, tag_limit: 7 });

        LoadUserThemeSettings().then(data => {
            Object.keys(PaletteData).forEach(key => {
                const value = PaletteData[key]

                root.style.setProperty(value.key, data[key])

                const Alwan = value.instance

                if (Alwan) {
                    const AlwanBtn = Alwan.Element,
                    hexColor = root.style.getPropertyValue(value.key),
                    modifier = tinycolor(hexColor)

                    if (AlwanBtn) {
                        if (modifier.isLight()) AlwanBtn.style.border = `2px solid ${modifier.darken(intensity)}`
                        else AlwanBtn.style.border = `2px solid ${modifier.lighten(intensity)}`
                    }

                    Alwan.setColor(hexColor)
                    Alwan.on('change', (ev) => onChange(AlwanBtn, ev, key, value, intensity, root))
                }
            })
        })
    }

    if (SaveBtn) {
        SaveBtn.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            SaveSetting(SaveBtn)
        })
    }

    if (ResetBtn) {
        ResetBtn.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            setTimeout(() => ResetSettings(ResetBtn), 1000)
        })
    }
})

function onChange(AlwanBtn: HTMLElement, ev: Alwan.alwanEvent, pkey: string, pdata: any, intensity: number, root: HTMLElement) {
    const hexColor = ev.hex,
    colorModifier = tinycolor(hexColor)

    if (AlwanBtn) {
        if (colorModifier.isLight()) AlwanBtn.style.border = `2px solid ${colorModifier.darken(intensity)}`
        else AlwanBtn.style.border = `2px solid ${colorModifier.lighten(intensity)}`
    }

    root.style.setProperty(pdata.key, hexColor)
    
    const saveData: Record<string, string> = {}
    saveData[pkey] = hexColor

    queueForSaving.push(saveData)
}