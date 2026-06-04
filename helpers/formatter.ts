import fieldSample from '@/templates/field.template.ts?raw'
import scraperSample from '@/templates/scrape.template.ts?raw'
import * as parser from '@babel/parser'
import { editor, MarkerSeverity } from 'monaco-editor'
import { SCRAPER_LOGIC } from './vars'

// 1. Define strict structures for configuration targets
interface ExpectedParam {
   name: string
   type: string
}

async function formatCode(code: string) {
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

function isCodeDefault(code: string, id: number) {
   const sample = id === SCRAPER_LOGIC ? scraperSample : fieldSample
   return normalize(code) === normalize(sample)
}

function normalize(code: string) {
   return code.replace(/\r\n/g, '').trim()
}

// Helper utility to safely resolve type annotations into strings from Babel AST
// 1. Updated helper that resolves arrays, generics, and unwraps annotations cleanly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTypeString = (node: any): string => {
   if (!node) return 'any'

   // Unwrap Babel's TSTypeAnnotation container if present
   if (node.type === 'TSTypeAnnotation') {
      return getTypeString(node.typeAnnotation)
   }

   // Base Types
   if (node.type === 'TSNumberKeyword') return 'number'
   if (node.type === 'TSStringKeyword') return 'string'
   if (node.type === 'TSBooleanKeyword') return 'boolean'
   if (node.type === 'TSVoidKeyword') return 'void'

   // Handles TableByte[] -> converts it to Array<TableByte> to match your REQUIRED_RETURN
   if (node.type === 'TSArrayType') {
      return `Array<${getTypeString(node.elementType)}>`
   }

   // Handles Array<TableByte>
   if (node.type === 'TSTypeReference') {
      const baseName = node.typeName.name || 'unknown'

      if (node.typeParameters && node.typeParameters.params.length > 0) {
         const genericArgs = node.typeParameters.params
            .map((param: unknown) => getTypeString(param))
            .join(', ')
         return `${baseName}<${genericArgs}>`
      }

      return baseName
   }

   return 'unknown'
}

function validateCode(code: string, id: number) {
   const REQUIRED_NAME = id === SCRAPER_LOGIC ? 'scrape' : 'makeSelector'
   const REQUIRED_RETURN = id === SCRAPER_LOGIC ? 'Array<Table>' : 'string'
   const REQUIRED_PARAMS: ExpectedParam[] = [
      {
         name: id === SCRAPER_LOGIC ? 'cfg' : 'el',
         type: id === SCRAPER_LOGIC ? 'Config' : 'HTMLElement',
      },
   ]

   const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript'],
   })

   const markers: editor.IMarkerData[] = []
   let mainFunctionFound = false

   for (const node of ast.program.body) {
      if (node.type === 'FunctionDeclaration') {
         const funcName = node.id?.name

         if (funcName === REQUIRED_NAME) {
            mainFunctionFound = true

            // --- VALIDATE PARAMETERS ---
            let paramsValid = node.params.length === REQUIRED_PARAMS.length

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            node.params.forEach((param: any, index: number) => {
               const expected = REQUIRED_PARAMS[index]
               if (!expected) {
                  paramsValid = false
                  return
               }

               const isAssignment = param.type === 'AssignmentPattern'
               const leftNode = isAssignment ? param.left : param

               const actualName = leftNode.name

               // PASS THE WHOLE leftNode.typeAnnotation AT NODE LEVEL
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
            // PASS THE returnType DIRECTLY
            const actualReturnType = getTypeString(node.returnType)

            if (
               actualReturnType !== REQUIRED_RETURN &&
               node.id &&
               node.id.loc
            ) {
               markers.push({
                  startLineNumber: node.id.loc.start.line,
                  startColumn: node.id.loc.end.column + 1,
                  endLineNumber: node.id.loc.end.line,
                  endColumn: node.id.loc.end.column + 15,
                  message: `Return type mismatch. Expected function to explicitly return type: "${REQUIRED_RETURN}" (Got: "${actualReturnType}")`,
                  severity: MarkerSeverity.Error,
               })
            }
         }
      }
   }

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

export { formatCode, isCodeDefault, validateCode }
