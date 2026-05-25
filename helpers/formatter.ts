import sample from '@/templates/code.template.ts?raw'
import * as parser from '@babel/parser'
import { editor, MarkerSeverity } from 'monaco-editor'

// 1. Define strict structures for configuration targets
interface ExpectedParam {
   name: string
   type: string
}

const REQUIRED_NAME = 'makeSelector'
const REQUIRED_RETURN = 'string'
const REQUIRED_PARAMS: ExpectedParam[] = [{ name: 'el', type: 'HTMLElement' }]

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

async function checkStandard(code: string) {
   const { check } = await import('prettier/standalone')
   const typescriptPlugin = await import('prettier/plugins/typescript')
   const estreePlugin = await import('prettier/plugins/estree')

   return check(code, {
      parser: 'typescript',
      plugins: [typescriptPlugin, estreePlugin],
      semi: false,
      singleQuote: true,
      tabWidth: 3,
      trailingComma: 'es5',
      endOfLine: 'crlf',
   })
}

async function isCodeDefault(code: string) {
   const against = await minifyCode(sample)
   const process = await minifyCode(code)

   return against === process
}

// Helper utility to safely resolve type annotations into strings from Babel AST
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTypeString = (typeAnnotation: any): string => {
   if (!typeAnnotation || !typeAnnotation.typeAnnotation) return 'any'
   const typeNode = typeAnnotation.typeAnnotation

   if (typeNode.type === 'TSNumberKeyword') return 'number'
   if (typeNode.type === 'TSStringKeyword') return 'string'
   if (typeNode.type === 'TSBooleanKeyword') return 'boolean'
   if (typeNode.type === 'TSVoidKeyword') return 'void'
   if (typeNode.type === 'TSTypeReference')
      return typeNode.typeName.name || 'unknown'

   return 'unknown'
}

function validateCode(code: string) {
   const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript'], // Supports TS annotations if typed
   })

   const markers: editor.IMarkerData[] = []
   let mainFunctionFound = false

   // 2. Walk the top-level nodes of the file
   for (const node of ast.program.body) {
      if (node.type === 'FunctionDeclaration') {
         const funcName = node.id?.name

         // Check if this is the target function
         if (funcName === REQUIRED_NAME) {
            mainFunctionFound = true

            // --- VALIDATE PARAMETERS (NAMES AND TYPES) ---
            let paramsValid = node.params.length === REQUIRED_PARAMS.length

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            node.params.forEach((param: any, index: number) => {
               const expected = REQUIRED_PARAMS[index]
               if (!expected) {
                  paramsValid = false
                  return
               }

               // Handle standard Identifier or AssignmentPattern (parameters with default values)
               const isAssignment = param.type === 'AssignmentPattern'
               const leftNode = isAssignment ? param.left : param

               const actualName = leftNode.name
               const actualType = getTypeString(leftNode.typeAnnotation)

               if (
                  actualName !== expected.name ||
                  actualType !== expected.type
               ) {
                  paramsValid = false
               }
            })

            if (!paramsValid && node.id && node.id.loc) {
               const expectedSignatureString = REQUIRED_PARAMS.map(
                  (p) => `${p.name}: ${p.type}`
               ).join(', ')

               markers.push({
                  startLineNumber: node.id.loc.start.line,
                  startColumn: node.id.loc.start.column + 1,
                  endLineNumber: node.id.loc.end.line,
                  endColumn: node.id.loc.end.column + 1,
                  message: `Parameter mismatch. Expected signature: (${expectedSignatureString})`,
                  severity: MarkerSeverity.Error,
               })
            }

            // --- VALIDATE RETURN TYPE ---
            const actualReturnType = getTypeString(node.returnType)
            if (
               actualReturnType !== REQUIRED_RETURN &&
               node.id &&
               node.id.loc
            ) {
               markers.push({
                  // Highlights right next to the function identifier where types sit
                  startLineNumber: node.id.loc.start.line,
                  startColumn: node.id.loc.end.column + 1,
                  endLineNumber: node.id.loc.end.line,
                  endColumn: node.id.loc.end.column + 15,
                  message: `Return type mismatch. Expected function to explicitly return type: "${REQUIRED_RETURN}"`,
                  severity: MarkerSeverity.Error,
               })
            }
         }
      }
   }

   // 3. Flag an error if the specific function name does not exist anywhere in the code
   if (!mainFunctionFound && code.trim().length > 0) {
      markers.push({
         startLineNumber: 1,
         startColumn: 1,
         endLineNumber: 1,
         endColumn: 20,
         message: `Missing required entry function: "function ${REQUIRED_NAME}(...)"`,
         severity: MarkerSeverity.Error,
      })
   }

   return markers
}

export { minifyCode, unminifyCode, checkStandard, isCodeDefault, validateCode }
