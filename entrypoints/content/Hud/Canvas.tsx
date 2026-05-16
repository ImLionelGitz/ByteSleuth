import {
   getDefaultUserData,
   getUserData,
   userSettings,
} from '@/helpers/datastores/userDatabase'
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

   const [color, setColor] = useState<string>(getDefaultUserData().color)

   useEffect(() => {
      const fetchColor = async () => {
         const { color } = await getUserData()
         console.log(color)
         setColor(color)
      }

      userSettings.watch((newVal, oldval) => {
         if (newVal.color !== oldval.color) {
            setColor(newVal.color)
         }
      })

      fetchColor()
   }, [])

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
                  fill={color}
               />
            ))}
         </Layer>
      </Stage>
   )
}
