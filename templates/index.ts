import fieldSample from '@/templates/field.template.ts?raw'
import scraperSample from '@/templates/scrape.template.ts?raw'
import fieldMainJS from '@/templates/exec.template.js?raw'
import scraperMainJS from '@/templates/exec2.template.js?raw'
import types from '@/templates/types.template.d.ts?raw'

export const javascript = { fieldMainJS, scraperMainJS }
export const templates = { fieldSample, scraperSample, types }
