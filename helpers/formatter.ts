async function unminifyCode(code: string) {
   const { format } = await import('prettier/standalone')
   const typescriptPlugin = await import('prettier/plugins/typescript')
   const estreePlugin = await import('prettier/plugins/estree')

   return format(code, {
      parser: 'typescript',
      plugins: [typescriptPlugin, estreePlugin],
      semi: false,
      singleQuote: true,
      tabWidth: 3,
      trailingComma: 'es5',
      endOfLine: 'crlf',
   })
}

async function minifyCode(code: string) {
   const { format } = await import('prettier/standalone')
   const typescriptPlugin = await import('prettier/plugins/typescript')
   const estreePlugin = await import('prettier/plugins/estree')

   const cleanCode = await format(code, {
      parser: 'typescript',
      plugins: [typescriptPlugin, estreePlugin],
      semi: true,
   })

   // Strip lines and extra spaces without harming TS types
   return cleanCode
      .replace(/\s+/g, ' ')
      .replace(/\s*([{};,=\-+*/<>:])\s*/g, '$1')
      .trim()
}

export { minifyCode, unminifyCode }
