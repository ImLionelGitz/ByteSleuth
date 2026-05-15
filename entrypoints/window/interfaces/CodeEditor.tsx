import { Editor, loader } from '@monaco-editor/react'
import { Paper } from '@mui/material'
import * as monaco from 'monaco-editor'
import TopBar from '../components/TopBar'

const COLOR_BG = '#252526'

export default function CodeEditor() {
   loader.config({ monaco: monaco })

   return (
      <Paper
         sx={{
            width: 512,
            height: 512,
            padding: 1,
            paddingTop: 0,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: COLOR_BG,
         }}
      >
         <TopBar bgColor={COLOR_BG} />

         <div
            style={{
               height: '90%',
               borderRadius: 'inherit',
               overflow: 'hidden',
               border: '2px solid #3E3E42',
            }}
         >
            <Editor
               height="100%"
               width="100%"
               defaultLanguage="typescript"
               defaultValue="function lol() {}"
               theme="vs-dark"
               options={{
                  minimap: {
                     enabled: false,
                  },

                  scrollBeyondLastLine: false,
                  automaticLayout: true,
               }}
            />
         </div>
      </Paper>
   )
}
