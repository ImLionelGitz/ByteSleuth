function scrape(cfg: Config): Table[] {
   const row = query(cfg.rowSelector)

   const results: Record<string, Element[]> = {}

   for (const field of cfg.fields) {
      results[field.name] = Array.from(row.querySelectorAll(field.selector))
   }

   const sizes = Object.values(results).map((e) => e.length)
   const max = Math.max(...sizes)

   return Array(max)
      .fill(0)
      .map((_, i) => {
         const data = {}

         for (const [key, val] of Object.entries(results)) {
            data[key] = text(val[i]) || ''
         }

         return data
      })
}
