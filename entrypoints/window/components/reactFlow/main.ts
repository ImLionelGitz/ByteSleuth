import { NodeTypes } from 'reactflow'
import { DefaultNode } from './DefaultNode'

const nodeTypes = {
   textNode: DefaultNode,
}

export type myNodeType = keyof typeof nodeTypes

export default nodeTypes as NodeTypes
