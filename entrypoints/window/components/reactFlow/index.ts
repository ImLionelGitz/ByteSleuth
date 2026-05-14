import { Node, NodeTypes } from 'reactflow'
import { DefaultNode, type TextData } from './DefaultNode'
import { type IOData, IONode } from './IONode'

const nodeTypes: NodeTypes = {
   textNode: DefaultNode,
   ioNode: IONode,
}

type DefNode = Node<TextData, 'textNode'>
type InputNode = Node<IOData, 'ioNode'>

export type myNodeType = DefNode | InputNode
export default nodeTypes
