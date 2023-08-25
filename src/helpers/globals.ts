import Alwan from "alwan"

const alwanOptions: Alwan.alwanOptions = {
    opacity: false,
    singleInput: true,
    inputs: { hex: true },
    copy: false,
    shared: true,
    preview: false,
    swatches: ['#6722a3', '#10aa1f', '#218a2b']
}

export const HighlighterVariable = '--Highlighter-Color'

export const ColorPalettes = (isPaletteRequired: boolean) => {
    const data: Record<string, { key: string, instance: Alwan | null }> = {
        hlcolor: {
            key: '--Highlighter-Color', 
            instance: (isPaletteRequired) ? new Alwan('#highlightColor', alwanOptions) : null
        },
        btncolor: {
            key: '--Button-Color',
            instance: (isPaletteRequired) ? new Alwan('#button1', alwanOptions) : null
        },
        btnhover: {
            key: '--Button-Hover',
            instance: (isPaletteRequired) ? new Alwan('#button2', alwanOptions): null
        },
        txtcolor: {
            key: '--Text-Color',
            instance: (isPaletteRequired) ? new Alwan('#text', alwanOptions) : null
        },
        bgcolor: {
            key: '--BG-Color',
            instance: (isPaletteRequired) ? new Alwan('#background', alwanOptions) : null
        },
    }

    return data
}

export let queueForSaving: Array<Record<string, any>> = []

export function clearSaveQueue() {
    queueForSaving = []
}