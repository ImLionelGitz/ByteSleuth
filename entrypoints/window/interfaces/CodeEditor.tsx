import { minifyCode, unminifyCode } from '@/helpers/formatter'
import sample from '@/templates/code.template.ts?raw'
import types from '@/templates/types.template.d.ts?raw'
import { Editor, loader } from '@monaco-editor/react'
import { Paper } from '@mui/material'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useEffect, useRef } from 'react'
import TopBar from '../components/TopBar'

interface CodeEditor extends Script {
   fields: FieldByte[]
   curEditingId: number
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
   const firstScriptId = prop.linkedIDs[0] || prop.curEditingId
   const monacoDef = useRef<monaco.IDisposable>(null)
   const [defaultCode, setDefaultCode] = useState(prop.code)

   const handleEditorDidMount = () => {
      if (firstScriptId === Math.PI) {
         const fileUri = 'file:///node_modules/@types/global/index.d.ts'
         monacoDef.current = monaco.typescript.typescriptDefaults.addExtraLib(
            types,
            fileUri
         )
      }
   }

   const checkoutForDef = async (test: string | undefined) => {
      if (test === undefined) return

      const testStr = await minifyCode(sample)
      const miniStr = await minifyCode(test)

      if (miniStr !== testStr) {
         prop.onCodeWrite(miniStr)
      }
   }

   useEffect(() => {
      const cleanUp = async () => {
         if (!defaultCode) return

         const formatted = await unminifyCode(defaultCode)
         setDefaultCode(formatted)
      }

      cleanUp()

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
            listOfLinked={prop.linkedIDs}
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
               value={defaultCode || sample}
               theme="vs-dark"
               options={{
                  minimap: {
                     enabled: false,
                  },

                  scrollBeyondLastLine: false,
                  automaticLayout: true,
               }}
               onMount={handleEditorDidMount}
               onChange={checkoutForDef}
            />
         </div>
      </Paper>
   )
}
