import oneContainer from '@/examples/one_container_scrape?raw'
import nthChild from '@/examples/nth_child_field?raw'

export const SCRAPER_LOGIC = 3.45
export const ROW_CONT_LOGIC = 5.67

export const SETTING_BTN_SIZE = 24

export const FIELD_NAME_LENGTH = 100
export const MAX_ALLOWED_FIELDS = 200
export const SCRIPT_LENGTH = 200_000

export const EXAMPLE_SCRIPTS = {
   field: [{ name: 'Nth Child Generator', code: nthChild }],
   scrape: [{ name: 'One Card Scrape', code: oneContainer }],
}
