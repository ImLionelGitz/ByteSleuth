import { SourceLocation } from 'acorn'
import { editor, MarkerSeverity } from 'monaco-editor'

let markers: editor.IMarkerData[] = []

function aggregateMarkers(loc: SourceLocation, msg: string) {
   const { start, end } = loc

   markers.push({
      startLineNumber: start.line,
      startColumn: start.column + 1,
      endLineNumber: end.line,
      endColumn: end.column + 1,
      message: msg,
      severity: MarkerSeverity.Error,
   })
}

function releaseMarkers() {
   const marks = [...markers]
   markers = []
   return marks
}

export { aggregateMarkers, releaseMarkers }
