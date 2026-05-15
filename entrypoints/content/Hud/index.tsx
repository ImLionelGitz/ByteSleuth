import React, { useState, useEffect, useRef } from 'react'
import SelectManager from '../classes/SelectManage'
import Canvas from './Canvas' // Your Konva canvas layer wrapper

export default function App() {
   const [boxes, setBoxes] = useState<BoxCoords[]>([])
   const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
   })
   const containerRef = useRef<HTMLDivElement>(null)
   const managerRef = useRef<SelectManager | null>(null)

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

      const manager = new SelectManager(
         containerRef.current,
         (finalSelector) => {
            console.log('Selected element query:', finalSelector)
            // Handle your business logic with the finalized selector here
         },
         (newBoxes) => {
            setBoxes(newBoxes) // Syncs DOM element coordinates to Konva
         }
      )

      managerRef.current = manager
      manager.enableSelection() // Turn on selection instantly or bind to a button

      return () => {
         manager.disableSelection()
      }
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
