function scrape(cfg: Config): Table {
   const rows = queryAll(cfg.rowSelector)

   return Array.from(rows).map((row) => {
      const result: TableEntry = {}

      for (const field of cfg.fields) {
         const element = row.querySelector(field.selector)
         result[field.name] = text(element)
      }
      
      return result
   })
}
