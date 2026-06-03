export default function setupTheme(vscode: typeof import('monaco-editor')) {
   vscode.languages.setMonarchTokensProvider('typescript', {
      keywords: [
         'abstract',
         'any',
         'as',
         'asserts',
         'async',
         'await',
         'boolean',
         'break',
         'case',
         'catch',
         'class',
         'console',
         'const',
         'constructor',
         'continue',
         'debugger',
         'declare',
         'default',
         'delete',
         'do',
         'else',
         'enum',
         'export',
         'extends',
         'false',
         'finally',
         'for',
         'from',
         'function',
         'get',
         'if',
         'implements',
         'import',
         'in',
         'infer',
         'instanceof',
         'interface',
         'is',
         'keyof',
         'let',
         'module',
         'namespace',
         'never',
         'new',
         'null',
         'number',
         'object',
         'package',
         'private',
         'protected',
         'public',
         'readonly',
         'require',
         'return',
         'set',
         'static',
         'string',
         'super',
         'switch',
         'this',
         'throw',
         'true',
         'try',
         'type',
         'typeof',
         'undefined',
         'unique',
         'unknown',
         'var',
         'void',
         'while',
         'with',
         'yield',
      ],
      tokenizer: {
         root: [
            // Helper function rule (Keep this high up for priority execution)
            [
               /\b(query|queryAll|text|attr|price|absoluteUrl|field|fieldById)\b(?=\s*\()/,
               'helper-func',
            ],

            // Standard TypeScript keywords
            [
               /[a-zA-Z_$][\w$]*/,
               {
                  cases: {
                     '@keywords': 'keyword',
                     // Targets any word starting with an UPPERCASE letter (e.g., Array, Set, MyClass)
                     '^[A-Z][\\w$]*': 'type.identifier',
                     '@default': '',
                  },
               },
            ],

            // Comments
            [/\/\/.*$/, 'comment'],
            [/\/\*/, 'comment', '@comment'], // Switches to a distinct comment state

            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'], // Non-terminated double-quoted string
            [/'([^'\\]|\\.)*$/, 'string.invalid'], // Non-terminated single-quoted string
            [/"/, 'string', '@string_double'],
            [/'/, 'string', '@string_single'],
            [/`/, 'string', '@string_backtick'],

            // Numbers
            [/\b\d+(\.\d+)?\b/, 'number'], // Standard decimals and integers
            [/\b0[xX][0-9a-fA-F]+\b/, 'number'], // Hexadecimal format
         ],

         // Sub-state definitions to correctly handle multi-line block content
         comment: [
            [/[^\\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\\/*]/, 'comment'],
         ],
         string_double: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape'],
            [/"/, 'string', '@pop'],
         ],
         string_single: [
            [/[^\\']+/, 'string'],
            [/\\./, 'string.escape'],
            [/'/, 'string', '@pop'],
         ],
         string_backtick: [
            [/[^\\`]+/, 'string'],
            [/\\./, 'string.escape'],
            [/`/, 'string', '@pop'],
         ],
      },
   })

   // 2. Define the theme that targets your new token
   vscode.editor.defineTheme('ByteSleuthTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
         { token: 'keyword', foreground: 'FF6188', fontStyle: 'bold' },
         { token: 'helper-func', foreground: 'A6E22E' },
         { token: 'type.identifier', foreground: 'AE81FF' },
         { token: 'comment', foreground: '74715E', fontStyle: 'italic' },
         { token: 'string', foreground: 'E6DB74' },
         { token: 'string.escape', foreground: 'CE9178' },
         { token: 'number', foreground: 'F97E72' },
         // site for colors: https://htmlcolorcodes.com
      ],
      colors: {},
   })

   // 3. Set the theme
   vscode.editor.setTheme('ByteSleuthTheme')
}
