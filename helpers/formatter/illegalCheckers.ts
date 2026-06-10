import { TSESTree } from '@typescript-eslint/types'
import { Parser, SourceLocation } from 'acorn'
import tsPlugin from 'acorn-typescript'
import { simple } from 'acorn-walk'
import { SCRAPER_LOGIC } from '../vars'
import { aggregateMarkers, releaseMarkers } from './mkrAggregator'

interface Signature {
   name: string
   param: string
   paramType: string
   returnType: string
}

const tsParser = Parser.extend(tsPlugin() as never)

const signatures: Record<number, Signature> = {
   [SCRAPER_LOGIC]: {
      name: 'scrape',
      param: 'cfg',
      paramType: 'Config',
      returnType: 'Table',
   },

   [Math.PI]: {
      name: 'makeSelector',
      param: 'el',
      paramType: 'HTMLElement',
      returnType: 'string',
   },
}

const defaultLoc: SourceLocation = {
   start: { line: 0, column: 0 },
   end: { line: 0, column: 0 },
}

function parseTypeScriptCode(code: string) {
   return tsParser.parse(code, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      locations: true,
   })
}

function parseType(node?: TSESTree.Node): string {
   if (!node) return 'any'

   if (node.type === TSESTree.AST_NODE_TYPES.TSStringKeyword) {
      return 'string'
   }

   if (node.type === TSESTree.AST_NODE_TYPES.TSTypeAnnotation) {
      return parseType(node.typeAnnotation)
   }

   // if (node.type === TSESTree.AST_NODE_TYPES.TSArrayType) {
   //    return `Array<${parseType(node.elementType)}>`
   // }

   if (node.type === TSESTree.AST_NODE_TYPES.TSTypeReference) {
      const baseRef = (node.typeName as TSESTree.Identifier).name

      // if (node.typeArguments && node.typeArguments.params.length > 0) {
      //    const genericArgs = node.typeArguments.params
      //       .map((param) => parseType(param))
      //       .join(', ')
      //    baseRef = `${baseRef}<${genericArgs}>`
      // }

      return baseRef
   }

   return 'unknown'
}

function checkCodeSignature(code: string, id: number) {
   const ast = parseTypeScriptCode(code)
   const realID = id === SCRAPER_LOGIC ? id : Math.PI
   const { name, param, paramType, returnType } = signatures[realID]

   simple(ast, {
      FunctionDeclaration(n) {
         const node = n as unknown as TSESTree.FunctionDeclaration

         if (node.id?.name !== name) {
            aggregateMarkers(
               node.id?.loc || defaultLoc,
               `Invalid function name, must be ${name}`
            )
         }

         if (node.params.length !== 1) {
            aggregateMarkers(node.loc || defaultLoc, 'Too many parameters')
         }

         if (
            node.params[0].type === 'Identifier' &&
            node.params[0].name !== param
         ) {
            aggregateMarkers(
               node.loc || defaultLoc,
               `Invalid parameter name, must be ${param}`
            )
         }

         // signature check end

         const arg = node.params[0]
         const leftNode = (arg.type ===
         TSESTree.AST_NODE_TYPES.AssignmentPattern
            ? arg.left
            : arg) as unknown as TSESTree.Identifier

         const actualArgType = parseType(leftNode.typeAnnotation)
         const actualFunType = parseType(node.returnType)

         switch (true) {
            case actualArgType !== paramType: {
               aggregateMarkers(
                  node.loc || defaultLoc,
                  `Invalid parameter type, must be ${paramType}`
               )

               break
            }

            case actualFunType !== returnType: {
               aggregateMarkers(
                  node.loc || defaultLoc,
                  `Invalid function return type, must be ${returnType}`
               )

               break
            }

            default:
               break
         }
      },
   })

   return releaseMarkers()
}

function hasInfiniteLoop(code: string) {
   const ast = parseTypeScriptCode(code)

   simple(ast, {
      WhileStatement(node) {
         aggregateMarkers(node.loc || defaultLoc, 'Infinite loop detected.')
      },

      DoWhileStatement(node) {
         aggregateMarkers(node.loc || defaultLoc, 'Infinite loop detected.')
      },

      ForStatement(node) {
         if (!node.test) {
            aggregateMarkers(node.loc || defaultLoc, 'Infinite loop detected.')
         }
      },

      CallExpression(node) {
         const callee = node.callee
         const illegals = ['setInterval', 'requestAnimationFrame']

         if (callee.type === 'Identifier' && illegals.includes(callee.name)) {
            aggregateMarkers(node.loc || defaultLoc, 'Illegal function call.')
         }
      },
   })

   return releaseMarkers()
}

export { checkCodeSignature, hasInfiniteLoop }
