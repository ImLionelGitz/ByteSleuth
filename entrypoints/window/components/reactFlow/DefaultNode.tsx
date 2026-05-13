import { Card, Tooltip, Typography, useTheme } from '@mui/material'
import { Handle, Node, NodeProps, Position } from 'reactflow'
import { myNodeType } from './main'

interface TextData {
   title: string
   info: string
}

interface TextNode extends NodeProps<TextData> {
   type: myNodeType
}

export type DefaultNodeType = Node<TextData>

export function DefaultNode({ data, isConnectable }: TextNode) {
   const { palette } = useTheme()

   return (
      <Card variant="elevation" elevation={1.4} sx={{ minWidth: 120 }}>
         <Typography
            sx={{
               paddingLeft: 0.8,
               fontSize: 8,
               fontFamily: 'Space-Grotesk',
               backgroundColor: palette.primary.main,
               color: palette.primary.contrastText,
            }}
         >
            {data.title}
         </Typography>

         <div style={{ textAlign: 'center', padding: 4, fontFamily: 'Inter' }}>
            {data.info}
         </div>

         <Tooltip title="Output">
            <Handle
               type="source"
               position={Position.Right}
               isConnectable={isConnectable}
               style={{
                  backgroundColor: palette.primary.main,
                  borderColor: palette.primary.dark,
               }}
            />
         </Tooltip>
      </Card>
   )
}
