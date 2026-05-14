import { Paper } from '@mui/material'
import ReactFlow, { Background, Controls } from 'reactflow'
import TopBar from '../components/TopBar'
import nodeTypes, { type myNodeType } from '../components/reactFlow'

export default function NodeEditor() {
   const nodes: myNodeType[] = [
      {
         id: '1',
         type: 'ioNode',
         data: { title: 'Goku', content: 'lolol', inputs: 1, outputs: 0 },
         position: { x: 0, y: 50 },
      },
   ]

   return (
      <div>
         <TopBar />

         <Paper
            sx={({ palette }) => ({
               width: '100%',
               height: '100vh',
               backgroundColor: palette.secondary.main,
            })}
         >
            <ReactFlow
               nodes={nodes}
               edges={[]}
               nodeTypes={nodeTypes}
               onNodesChange={() => {}}
               onEdgesChange={() => {}}
               proOptions={{ hideAttribution: true }}
               fitView
            >
               <Background color="#333" gap={16} />
               <Controls />
            </ReactFlow>
         </Paper>
      </div>
   )
}
