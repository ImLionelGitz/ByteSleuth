import { Card, Typography, useTheme } from '@mui/material'
import { JSX } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

export interface IOData {
   title: string
   content: string | JSX.Element
   inputs: number
   outputs: number
}

export function IONode({ data, isConnectable }: NodeProps<IOData>) {
   const { palette } = useTheme()
   const inps = Array(data.inputs).fill('')

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
            {data.content}
         </div>

         {inps.map((_, i) => (
            <Handle
               key={i}
               type="source"
               id={`source ${i}`}
               position={Position.Right}
               isConnectable={isConnectable}
               style={{
                  backgroundColor: palette.primary.main,
                  borderColor: palette.primary.dark,
                  top: `${12 * i}%`,
               }}
            />
         ))}
      </Card>
   )
}
