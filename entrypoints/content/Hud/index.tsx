import { useEffect, useRef, useState } from 'react'
import setupListeners from '../listeners'
import Canvas from './Canvas' // Your Konva canvas layer wrapper

export default function App() {
   const [boxes, setBoxes] = useState<BoxCoords[]>([])
   const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   })
   const containerRef = useRef<HTMLDivElement>(null)

   // Keep track of window size updates
   useEffect(() => {
      const handleResize = () =>
         setSize({ width: window.innerWidth, height: window.innerHeight })
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   // Initialize the manager once the overlay container mounts
   useEffect(() => {
      if (!containerRef.current) return

      const handleHighlight = (boxes: BoxCoords[]) => setBoxes(boxes)

      setupListeners(containerRef.current, handleHighlight)
      return () => {}
   }, [])

   return (
      <div
         ref={containerRef}
         style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 99999,
         }}
      >
         <Canvas boxes={boxes} size={size} />
      </div>
   )
}
