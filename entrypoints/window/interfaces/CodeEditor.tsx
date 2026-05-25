import { minifyCode, unminifyCode } from '@/helpers/formatter'
import sample from '@/templates/code.template.ts?raw'
import types from '@/templates/types.template.d.ts?raw'
import { Editor, loader } from '@monaco-editor/react'
import { Paper } from '@mui/material'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useEffect, useRef } from 'react'
import CodeMenu from './popups/CodeMenu'

interface CodeEditorProps extends Script {
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

export default function CodeEditor(prop: CodeEditorProps) {
   const firstScriptId = useRef(prop.curEditingId)
   const monacoDef = useRef<monaco.IDisposable | null>(null)
   const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
   const [defaultCode, setDefaultCode] = useState(prop.code)

   // --- MUI Menu States ---
   const [menuPosition, setMenuPosition] = useState<{
      mouseX: number
      mouseY: number
   } | null>(null)

   const handleEditorDidMount = (
      editor: monaco.editor.IStandaloneCodeEditor,
      vscode: typeof import('monaco-editor')
   ) => {
      editorRef.current = editor

      if (firstScriptId.current === Math.PI) {
         const fileUri = 'file:///node_modules/@types/global/index.d.ts'
         // Assuming 'types' is defined globally or imported elsewhere in your file
         monacoDef.current = vscode.typescript.typescriptDefaults.addExtraLib(
            types,
            fileUri
         )
      }

      // Handle Right Click Event inside Monaco
      editor.onContextMenu(({ event }) => {
         event.preventDefault()
         event.stopPropagation()

         // Capture exact client cursor coordinates
         setMenuPosition({
            mouseX: event.browserEvent.clientX,
            mouseY: event.browserEvent.clientY,
         })
      })
   }

   // --- MUI Menu Action Helpers ---
   const handleClose = () => {
      setMenuPosition(null)
   }

   const checkoutForDef = async (test: string | undefined) => {
      if (test === undefined) return

      try {
         // Assuming 'minifyCode' and 'sample' are imported or defined elsewhere
         const testStr = await minifyCode(sample)
         const miniStr = await minifyCode(test)

         if (miniStr !== testStr) {
            prop.onCodeWrite(miniStr)
         }
      } catch {
         prop.onCodeWrite(undefined)
      }
   }

   const handleItemSelect = (id: number) => {
      prop.onFieldLink(id, !prop.linkedIDs.includes(id))
   }

   useEffect(() => {
      const cleanUp = async () => {
         if (!defaultCode) return
         // Assuming 'unminifyCode' is imported or defined elsewhere
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
            width: '80%',
            height: '80%',
            padding: 1,
            borderRadius: 2,
            backgroundColor: COLOR_BG, // Assuming COLOR_BG is imported/defined
         }}
      >
         <div
            style={{
               height: '100%',
               border: '2px solid #3E3E42',
            }}
         >
            <Editor
               height="100%"
               width="100%"
               defaultLanguage="typescript"
               value={defaultCode || sample} // Assuming sample is imported/defined
               theme="vs-dark"
               options={{
                  minimap: { enabled: false },
                  lightbulb: {
                     enabled: monaco.editor.ShowLightbulbIconMode.Off,
                  }, // Adjusted fallback typing
                  contextmenu: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
               }}
               onMount={handleEditorDidMount}
               onChange={checkoutForDef}
            />
         </div>

         {/* --- Primary MUI Context Menu --- */}
         <CodeMenu
            open={menuPosition !== null}
            fields={prop.fields}
            linkedIds={prop.linkedIDs}
            itemSelect={handleItemSelect}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
               menuPosition !== null
                  ? { top: menuPosition.mouseY, left: menuPosition.mouseX }
                  : undefined
            }
         />
      </Paper>
   )
}
