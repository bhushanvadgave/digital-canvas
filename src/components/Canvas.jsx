import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import useStore from './store';
import { motion } from 'framer-motion'

const Canvas = () => {
  const { selectedColor, setSelectedColor, brushSize, setBrushSize, brushOpacity, setBrushOpacity, selectedMode, setSelectedMode, saveState} = useStore();

  const canvasRef = useRef(null)
  
  const { initCanvas, pushToHistory } = useStore()

  useEffect(() => {
    console.log("inside use effect of canvasArea component");
    if (canvasRef.current) {
      initCanvas(canvasRef.current)
      const canvas = useStore.getState().canvas

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
          const newSize = useStore.getState().brushProperties.brushSize * (1 - speed/3)
          if(canvas.freeDrawingBrush) canvas.freeDrawingBrush.width = newSize
        }
        lastPoint = currentPoint
      })

      return () => {
        canvas.off('object:added', saveState);
        canvas.off('object:modified', saveState);
        canvas.off('object:removed', saveState);
        // canvas.off('path:created', saveState);
        canvas.dispose();
      };
    }
  }, [])

  return (
    <div className='moddle-section'>  
    {/* <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    > */}
    <div className='my-canvas-wrapper'>
      <canvas ref={canvasRef} className="canvas"/>
      </div>
    {/* </motion.div> */}
    </div>
  );
};

export default Canvas;