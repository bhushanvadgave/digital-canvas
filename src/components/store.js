import { create } from 'zustand';
import * as fabric from 'fabric'

// Define the store
const useStore = create((set, get) => ({


  history: [],
  historyIndex: -1,
  maxHistory: 50,
  isUndoRedoing: false,

  selectedColor: '#000000',
  setSelectedColor: (color) => {
    set({ selectedColor: color })
    get().updateBrushProperties('color', color);
  },

  canvas: null,
  selectedMode: 'brush',

  brushProperties: {
    brushSize: 5,
    brushOpacity: 1,
    brushHardness: 0.5,
    color: '#000000',
  },

  setSelectedMode: (mode) => {
    const { canvas } = get()
    canvas.isDrawingMode = mode === 'brush' || mode === 'eraser';

    // canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    // canvas.freeDrawingBrush.color = get().selectedColor
    // // canvas.freeDrawingBrush.globalCompositeOperation = 'source-over'
    // canvas.freeDrawingBrush.width = get().brushProperties.brushSize
    // canvas.freeDrawingBrush.color = get().brushProperties.color
    // canvas.freeDrawingBrush.opacity = get().brushProperties.brushOpacity
    // // canvas.freeDrawingBrush.shadow = new fabric.Shadow({
    // //   blur: 0, // Important for opacity to work correctly
    // // });

    set({ selectedMode: mode })
  },

  initCanvas: (element) => {
    const { selectedMode } = get()
    const canvas = new fabric.Canvas(element, {
      // backgroundColor : "#ffffff",
      isDrawingMode: selectedMode === 'brush' || selectedMode === 'eraser',
      width: window.innerWidth - 250,
      height: window.innerHeight - 100,
      renderOnAddRemove: false,
      selection: true, // Ensure selection is enabled
      preserveObjectStacking: true
    })

    // Add selection event listener
    canvas.on('selection:created', () => {
      console.log('Objects selected:', canvas.getActiveObjects());
    });

    canvas.on('selection:cleared', () => {
      console.log('Selection cleared');
    });

    const initialState = canvas.toJSON();
    set({ canvas, history: [initialState], historyIndex: 0 });

    // Track changes for undo/redo
    const saveStateConditionally = () => {
      if (!get().isUndoRedoing) {
        get().saveState();
      }
    }

    canvas.on('object:added', saveStateConditionally);
    canvas.on('object:modified', saveStateConditionally);
    canvas.on('object:removed', saveStateConditionally);
    // canvas.on('path:created', saveState);
    // canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    // canvas.backgroundColor = '#ffffff';
    // canvas.renderAll();
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.width = get().brushProperties.brushSize;
    canvas.freeDrawingBrush.color = get().selectedColor
    // canvas.freeDrawingBrush._setBrushStyles = function(ctx) {
    //   ctx.globalCompositeOperation = 'source-over';
    // };
  },

  saveState: (e) => {
    // console.log("saveState", e);
    const { canvas, history, historyIndex, maxHistory, isUndoRedoing } = get();
    if (isUndoRedoing) return;
    const currentState = canvas.toJSON();
    // Only save if different from last state
    if (JSON.stringify(currentState) !== JSON.stringify(history[historyIndex])) {
      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        currentState
      ].slice(-maxHistory); // Keep history size limited

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1
      });
    }
  },

  undo: async () => {
    console.log("undo");
    const { canvas, history, historyIndex, isUndoRedoing } = get();
    if (isUndoRedoing || historyIndex <= 0) return;
    set({ isUndoRedoing: true }); // Set flag
    // console.log("historyIndex1", historyIndex);
    // console.log("history[historyIndex - 1]=", history[historyIndex - 1]);
    await canvas.loadFromJSON(history[historyIndex - 1]);
    canvas.renderAll();
    set({ historyIndex: historyIndex - 1, isUndoRedoing: false });
  },

  // Redo functionality
  redo: async () => {
    console.log("redo");
    const { canvas, history, historyIndex, isUndoRedoing } = get();
    if (isUndoRedoing || historyIndex >= history.length - 1) return;
    set({ isUndoRedoing: true });
    await canvas.loadFromJSON(history[historyIndex + 1]);
    canvas.renderAll();
    set({ historyIndex: historyIndex + 1, isUndoRedoing: false });
  },

  updateBrushProperties: (property, value) => {
    const { canvas } = get()
    const properties = { ...get().brushProperties, [property]: value }

    if (canvas && canvas.freeDrawingBrush) {

      canvas.freeDrawingBrush.width = properties.brushSize
      canvas.freeDrawingBrush.color = properties.color
      canvas.freeDrawingBrush.opacity = properties.brushOpacity
    }
    set({ brushProperties: properties })
  },

  createShape: (tool) => {
    const { brushProperties, selectedColor, canvas } = get();
    let shapeObj;

    switch (tool) {
      case 'rectangle':
        shapeObj = new fabric.Rect({
          left: 100,
          top: 100,
          width: 60,
          height: 60,
          // fill: selectedColor,
          fill: null,
          stroke: selectedColor,
          strokeWidth: parseInt(brushProperties.brushSize, 10),
          // lockScalingY: true,
          opacity: brushProperties.brushOpacity,
          textEditingBorderColor: '#4285f4', // Visual cue for text editing
        });
        break;
      case 'circle':
        shapeObj = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 30,
          // fill: selectedColor,
          fill: null,
          stroke: selectedColor,
          strokeWidth: parseInt(brushProperties.brushSize, 10),
          opacity: brushProperties.brushOpacity
        });
        break;
      case 'line':
        shapeObj = new fabric.Line(
          [100, 100, 400, 100],
          {
            stroke: selectedColor,
            strokeWidth: parseInt(brushProperties.brushSize, 10),
            // lockScalingY: true,
            opacity: brushProperties.brushOpacity
          }
        );
        break;
      case 'triangle':
        shapeObj = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 60,
          height: 60,
          // fill: selectedColor,
          fill: null,
          stroke: selectedColor,
          strokeWidth: parseInt(brushProperties.brushSize, 10),
        });
        break;
      case 'text':
        shapeObj = new fabric.Textbox('Double click to edit', {
          left: 100,
          top: 100,
          width: 200,
          fontSize: 20,
          fill: '#000000',
          fontFamily: 'Arial',
          textAlign: 'left',
          editable: true,
          selectable: true
        });
        break;
    }

    if (shapeObj) {
      canvas.add(shapeObj);
      if(tool === 'text') {
        canvas.setActiveObject(shapeObj);
        shapeObj.enterEditing();
        shapeObj.selectAll();
      }
      canvas.renderAll();
      get().setSelectedMode('transform');
    }
  },

  pushToHistory: () => {
    const { canvas, history, historyIndex } = get()
    const newHistory = [...history.slice(0, historyIndex + 1), canvas.toJSON()]
    set({ history: newHistory, historyIndex: historyIndex + 1 })
  },

  exportAsPNG: () => {
    console.log("exportAsPNG");
    const { canvas } = get();
    if (!canvas) return;
    console.log("canvas", canvas);
    // Create temporary link
    const link = document.createElement('a');
    link.download = `canvas-${new Date().toISOString().slice(0, 10)}.png`;

    // Set image quality (0-1)
    const quality = 1.0; // Highest quality

    // Export options
    const exportOptions = {
      format: 'png',
      quality: quality,
      multiplier: 2 // Higher resolution (2x)
    };

    // Get data URL and trigger download
    const dataURL = canvas.toDataURL(exportOptions)
    link.href = dataURL;
    link.click();
  },

  deleteSelected: () => {
    const { canvas } = get();
    if (!canvas) return;

    // Get currently active objects
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects && activeObjects.length > 0) {
      // Batch remove for better performance
      canvas.discardActiveObject();
      canvas.remove(...activeObjects);
      canvas.requestRenderAll();

      // Save state after deletion
      get().saveState();
    }
  }

}));

export default useStore;
