import { create }  from 'zustand'
import * as fabric from 'fabric'

export const useStore = create((set, get) => ({
  canvas: null,
  tools: {
    active: 'brush',
    brushSize: 5,
    brushOpacity: 1,
    brushHardness: 0.5,
    color: '#000000',
  },
  history: [],
  historyIndex: -1,

  initCanvas: (element) => {
    const canvas = new fabric.Canvas(element, {
      isDrawingMode: true,
      width: window.innerWidth - 300,
      height: window.innerHeight - 100,
    })
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    set({ canvas })
  },

  setTool: (tool) => {
    const { canvas } = get()
    canvas.isDrawingMode = tool === 'brush' || tool === 'eraser'
    set({ tools: { ...get().tools, active: tool } })
  },

  updateBrush: (property, value) => {
    const { canvas } = get()
    const tools = { ...get().tools, [property]: value }
    
    if (canvas) {
      canvas.freeDrawingBrush.width = tools.brushSize
      canvas.freeDrawingBrush.color = tools.color
      canvas.freeDrawingBrush.opacity = tools.brushOpacity
    }
    set({ tools })
  },

  pushToHistory: () => {
    const { canvas, history, historyIndex } = get()
    const newHistory = [...history.slice(0, historyIndex + 1), canvas.toJSON()]
    set({ history: newHistory, historyIndex: historyIndex + 1 })
  },

  undo: () => {
    const { history, historyIndex, canvas } = get()
    if (historyIndex > 0) {
      canvas.loadFromJSON(history[historyIndex - 1], () => {
        set({ historyIndex: historyIndex - 1 })
      })
    }
  },

  redo: () => {
    const { history, historyIndex, canvas } = get()
    if (historyIndex < history.length - 1) {
      canvas.loadFromJSON(history[historyIndex + 1], () => {
        set({ historyIndex: historyIndex + 1 })
      })
    }
  },
}))