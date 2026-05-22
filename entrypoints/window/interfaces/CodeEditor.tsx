import { useEffect, useRef } from 'react'
import sample from '@/templates/code.template.ts?raw'
import { Editor, loader } from '@monaco-editor/react'
import { Paper } from '@mui/material'
import * as monaco from 'monaco-editor'
import TopBar from '../components/TopBar'
import types from '@/templates/types.template.d.ts?raw'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

interface CodeEditor {
   fields: FieldByte[]
   curEditingId: number
   curScript: Script | null
   onCodeWrite: (code: string | undefined) => void
   onFieldLink: (id: number, tick: boolean) => void
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

loader.config({ monaco: monaco })

export default function CodeEditor(prop: CodeEditor) {
   const firstScriptId = prop.curScript?.linkedIDs[0] || prop.curEditingId
   const monacoDef = useRef<monaco.IDisposable>(null)

   const handleEditorDidMount = () => {
      if (firstScriptId === Math.PI) {
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
         <TopBar
            bgColor={COLOR_BG}
            fields={prop.fields}
            curEditingField={prop.curEditingId}
            listOfLinked={prop.curScript?.linkedIDs || []}
            onFieldCheck={prop.onFieldLink}
         />

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
               value={prop.curScript?.code || sample}
               theme="vs-dark"
               options={{
                  minimap: {
                     enabled: false,
                  },

                  scrollBeyondLastLine: false,
                  automaticLayout: true,
               }}
               onMount={handleEditorDidMount}
               onChange={prop.onCodeWrite}
            />
         </div>
      </Paper>
   )
}
