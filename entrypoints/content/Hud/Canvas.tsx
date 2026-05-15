import { Layer, Rect, Stage } from 'react-konva'

interface CanvasProps {
   boxes: BoxCoords[]
   size: { width: number; height: number }
}

export default function Canvas({ boxes, size }: CanvasProps) {
   // Use document scroll dimensions to allow drawing boxes on scrolled content
   const pageHeight = Math.max(
      document.documentElement.scrollHeight,
      size.height
   )
   const pageWidth = Math.max(document.documentElement.scrollWidth, size.width)

   return (
      <Stage width={pageWidth} height={pageHeight}>
         <Layer>
            {boxes.map((box, index) => (
               <Rect
                  key={index}
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  stroke="red"
                  strokeWidth={2}
                  fill="rgba(255, 0, 0, 0.1)"
                  pointerEvents="auto" // Allows interaction with drawn boxes if needed
               />
            ))}
         </Layer>
      </Stage>
   )
}
