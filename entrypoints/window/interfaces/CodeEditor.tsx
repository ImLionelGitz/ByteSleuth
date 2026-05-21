import sample from '@/templates/code.template.ts?raw'
import { Editor, loader } from '@monaco-editor/react'
import { Paper } from '@mui/material'
import * as monaco from 'monaco-editor'
import TopBar from '../components/TopBar'
import types from '@/templates/types.template.d.ts?raw'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

interface CodeEditor {
   
}

const COLOR_BG = '#252526'

self.MonacoEnvironment = {
   getWorker(_, label) {
      if (label === 'typescript') {
         return new tsWorker()
      }

      return new editorWorker()
   },
}

export default function CodeEditor() {
   loader.config({ monaco: monaco })

   const monacoDef = useRef<monaco.IDisposable>(null)

   const handleEditorDidMount = () => {
      if (curScriptID === Math.PI) {
         const fileUri = 'file:///node_modules/@types/global/index.d.ts'
         monacoDef.current = monaco.typescript.typescriptDefaults.addExtraLib(
            types,
            fileUri
         )
      }
   }

   useEffect(() => {
      return () => {
         monacoDef.current?.dispose()
      }
   }, [])

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
               //borderRadius: 'inherit',
               //overflow: 'hidden',
               border: '2px solid #3E3E42',
            }}
         >
            <Editor
               height="100%"
               width="100%"
               defaultLanguage="typescript"
               defaultValue={sample}
               theme="vs-dark"
               options={{
                  minimap: {
                     enabled: false,
                  },

                  scrollBeyondLastLine: false,
                  automaticLayout: true,
               }}
               onMount={handleEditorDidMount}
            />
         </div>
      </Paper>
   )
}
