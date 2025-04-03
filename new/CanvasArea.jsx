import { useEffect, useRef } from 'react'
import { useStore } from './store.js'
import { motion } from 'framer-motion'

export function CanvasArea() {
  const canvasRef = useRef(null)
  const { initCanvas, pushToHistory } = useStore()

  useEffect(() => {
    console.log("inside use effect of canvasArea component");
    if (canvasRef.current) {
      initCanvas(canvasRef.current)
      const canvas = useStore.getState().canvas
      
      canvas.on('path:created', () => {
        pushToHistory()
      })

      // Pressure sensitivity simulation
      let lastPoint = null
      canvas.on('mouse:move', (e) => {
        if (!canvas.isDrawingMode || !e.pointer) return
        
        const currentPoint = { x: e.pointer.x, y: e.pointer.y }
        if (lastPoint) {
          const distance = Math.sqrt(
            Math.pow(currentPoint.x - lastPoint.x, 2) + 
            Math.pow(currentPoint.y - lastPoint.y, 2)
          )
          const speed = Math.min(distance / 10, 1)
          const newSize = useStore.getState().tools.brushSize * (1 - speed/3)
          if(canvas.freeDrawingBrush) canvas.freeDrawingBrush.width = newSize
        }
        lastPoint = currentPoint
      })
    }
    return () => {
        if (canvasRef.current) {
            canvasRef.current.dispose();
            canvasRef.current = null;
        }
      };
  }, [])

  return (
    <motion.div 
      className="canvas-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <canvas ref={canvasRef} />
    </motion.div>
  )
}