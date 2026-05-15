import Canvas from './Canvas'

export interface BoxCoords {
   x: number
   y: number
   width: number
   height: number
}

export default function Hud() {
   const [boxes, setBoxes] = useState<BoxCoords[]>([])
   const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   })

   useEffect(() => {
      // Handle window resizing
      const handleResize = () => {
         setSize({ width: window.innerWidth, height: window.innerHeight })
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   // Example: Target specific elements to box on click
   useEffect(() => {
      const handlePageClick = (e: MouseEvent) => {
         const target = e.target as HTMLElement
         if (target.closest('#konva-element-overlay')) return // Ignore clicks on the canvas itself

         const rect = target.getBoundingClientRect()
         const newBox: BoxCoords = {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
         }

         setBoxes((prev) => [...prev, newBox])
      }

      window.addEventListener('click', handlePageClick)
      return () => window.removeEventListener('click', handlePageClick)
   }, [])

   return <Canvas boxes={boxes} size={size} />
}
