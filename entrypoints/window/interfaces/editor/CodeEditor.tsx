import {
   formatCode,
   checkCodeSignature,
   hasInfiniteLoop,
} from '@/helpers/formatter'
import fieldSample from '@/templates/field.template.ts?raw'
import scraperSample from '@/templates/scrape.template.ts?raw'
import types from '@/templates/types.template.d.ts?raw'
import { Editor, loader } from '@monaco-editor/react'
import { Box, Paper, Skeleton } from '@mui/material'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { ChangeEvent, useEffect, useRef } from 'react'
import CodeMenu from '../popups/CodeMenu'
import { SCRAPER_LOGIC } from '@/helpers/vars'
import { deleteScript } from '@/helpers/datastores/scriptDatabase'
import setupTheme from './setupTheme'

interface CodeEditorProps extends Omit<Script, 'code'> {
   fields: FieldByte[]
   scripts: Script[]
   code: string | undefined
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
   //const firstScriptId = useRef(prop.id)
   const monacoDef = useRef<monaco.IDisposable | null>(null)
   const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
   const timeout = useRef<NodeJS.Timeout | null>(null)

   const fileInputRef = useRef<HTMLInputElement>(null)

   const sampleCode = useMemo(() => {
      if (prop.id === SCRAPER_LOGIC) return scraperSample
      else return fieldSample
   }, [])

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

      if (prop.id === SCRAPER_LOGIC) {
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

      setupTheme(vscode)
   }

   // --- MUI Menu Action Helpers ---
   const handleClose = () => {
      setMenuPosition(null)
   }

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      const tester = /^[^.]+\.ts$/

      if (file && tester.test(file.name)) {
         const reader = new FileReader()

         reader.onload = (e) => {
            if (!editorRef.current) return

            if (typeof e.target?.result === 'string') {
               const code = e.target.result

               editorRef.current.setValue(code)
               //prop.onCodeWrite(code)
            }
         }

         reader.readAsText(file)
      }
   }

   const handleItemSelect = (id: number) => {
      prop.onFieldLink(id, !prop.linkedIDs.includes(id))
   }

   const handleExample = (code: string) => {
      if (!editorRef.current) return

      editorRef.current.setValue(code)
   }

   const handleCodeWrite = (code: string | undefined) => {
      if (timeout.current) {
         clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
         if (!editorRef.current) return

         try {
            if (code) {
               const model = editorRef.current.getModel()
               if (!model) return

               const signatureIssues = checkCodeSignature(code, prop.id)
               const illegalFound = hasInfiniteLoop(code)

               if (!signatureIssues.length && !illegalFound.length) {
                  monaco.editor.setModelMarkers(model, 'byte-sleuth-lint', [])
                  prop.onCodeWrite(code)

                  return
               }

               monaco.editor.setModelMarkers(model, 'byte-sleuth-lint', [
                  ...signatureIssues,
                  ...illegalFound,
               ])
            }
         } catch {
            prop.onCodeWrite(undefined)
         }
      }, 300)
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

         case 'OPEN': {
            fileInputRef.current?.click()
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
            const formatted = await formatCode(editor.getValue())
            editor.setValue(formatted)
            break
         }

         case 'RESET': {
            editor.setValue(sampleCode)
            deleteScript(prop.id)
            break
         }

         case 'SAVE': {
            const blob = new Blob([editorRef.current.getValue()], {
               type: 'text/plain;charset=utf-8',
            })

            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = 'byte-sleuth.ts'
            a.click()

            URL.revokeObjectURL(url)
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
            {prop.code !== undefined ? (
               <Editor
                  height="100%"
                  width="100%"
                  defaultLanguage="typescript"
                  value={prop.code || sampleCode} // Assuming sample is imported/defined
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
            ) : (
               <Box sx={{ width: '100%', height: '100%', padding: 2 }}>
                  {/* Multi-line skeleton matching the visual block of a code editor */}
                  <Skeleton
                     variant="text"
                     width="60%"
                     height={30}
                     animation="wave"
                  />
                  <Skeleton
                     variant="text"
                     width="80%"
                     height={30}
                     animation="wave"
                  />
                  <Skeleton
                     variant="text"
                     width="45%"
                     height={30}
                     animation="wave"
                  />
                  <Skeleton
                     variant="rectangular"
                     width="100%"
                     height="68%"
                     sx={{ mt: 2, borderRadius: 1 }}
                     animation="wave"
                  />
               </Box>
            )}
         </div>

         {/* --- Primary MUI Context Menu --- */}
         <CodeMenu
            open={menuPosition !== null}
            fields={prop.fields}
            scripts={prop.scripts}
            curID={prop.id}
            linkedIds={prop.linkedIDs}
            itemSelect={handleItemSelect}
            exampleSelect={handleExample}
            ctxAction={handleContext}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
               menuPosition !== null
                  ? { top: menuPosition.mouseY, left: menuPosition.mouseX }
                  : undefined
            }
         />

         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hides it from view
            accept=".ts" // Optional: restricts file types
         />
      </Paper>
   )
}
