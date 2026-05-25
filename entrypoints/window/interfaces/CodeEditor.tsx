import { unminifyCode, validateCode } from '@/helpers/formatter'
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

   const handleItemSelect = (id: number) => {
      prop.onFieldLink(id, !prop.linkedIDs.includes(id))
   }

   const handleCodeWrite = (code: string | undefined) => {
      if (!editorRef.current) return

      try {
         if (code) {
            const isValid = validateCode(code)
            const model = editorRef.current.getModel()
            if (!model) return

            if (isValid.length > 0) {
               monaco.editor.setModelMarkers(model, 'signature-lint', isValid)
            } else {
               monaco.editor.setModelMarkers(model, 'signature-lint', [])
               prop.onCodeWrite(code)
            }
         }
      } catch {
         prop.onCodeWrite(undefined)
      }
   }

   const handleContext = async (action: CtxAction) => {
      if (!editorRef.current) return

      const editor = editorRef.current

      switch (action) {
         case 'CUT': {
            editor.focus()
            editor.trigger('source', 'editor.action.clipboardCutAction', null)
            break
         }

         case 'COPY': {
            editor.focus()
            editor.trigger('source', 'editor.action.clipboardCopyAction', null)
            break
         }

         case 'PASTE': {
            try {
               // Fallback to browser Clipboard API since Monaco paste trigger can be restricted
               const text = await navigator.clipboard.readText()
               const selection = editor.getSelection()
               if (!selection) return

               const op = {
                  range: selection,
                  text: text,
                  forceMoveMarkers: true,
               }

               editor.executeEdits('my-source', [op])
            } catch {
               // Fallback trigger if navigator.clipboard is blocked by permissions
               editor.trigger(
                  'source',
                  'editor.action.clipboardPasteAction',
                  null
               )
            }

            break
         }

         case 'FORMAT': {
            const formatted = await unminifyCode(editor.getValue())
            editor.setValue(formatted)
            break
         }

         default:
            break
      }

      handleClose()
   }

   useEffect(() => {
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
               value={prop.code || sample} // Assuming sample is imported/defined
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
               onChange={handleCodeWrite}
            />
         </div>

         {/* --- Primary MUI Context Menu --- */}
         <CodeMenu
            open={menuPosition !== null}
            fields={prop.fields}
            linkedIds={prop.linkedIDs}
            itemSelect={handleItemSelect}
            ctxAction={handleContext}
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
