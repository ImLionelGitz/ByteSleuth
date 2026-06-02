function scrape(cfg: Config): Table[] {
   const rows = document.querySelectorAll(cfg.rowSelector)

   return Array.from(rows).map((row) => {
      const result: Table = {}
      for (const field of cfg.fields) {
         const element = row.querySelector(field.selector)
         result[field.name] = element?.textContent?.trim() ?? ''
      }
      return result
   })
}
