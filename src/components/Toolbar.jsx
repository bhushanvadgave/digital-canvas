import React from 'react';
import useStore from './store';
import { Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text, Spacer, IconButton, Divider, Tooltip, SliderMark  } from '@chakra-ui/react'
import { Brush, Eraser, Pipette as Eyedropper, Shapes, Triangle, Type,RectangleHorizontal, Circle, Minus, Download, Move, Undo2, Redo2, Pencil } from 'lucide-react'
import ColorPicker from './ColorPicker';

const Toolbar = () => {

  const { selectedColor, setSelectedColor, selectedMode, setSelectedMode, createShape, brushProperties, updateBrushProperties, exportAsPNG, undo, redo, history, historyIndex } = useStore();

  return (
    <div className='toolbar'>
      <Box p={4} display="flex" flexDirection="column" gap={4} maxH='100vh' justifyContent='space-around'>
      <Tooltip label='Draw' bg='red.600'>
        <Button
          onClick={() => setSelectedMode('brush')}
          // variant='outline'
          variant='plain'
        color="white"
        borderColor="white"
        _hover={{ color: "#4CAF50", borderColor: "#4CAF50" }}
          // isActive={selectedMode === "brush"}
          style={selectedMode === "brush" ? { color:"#4CAF50" }:{}}
        >
          <Pencil />
        </Button>
        </Tooltip>

        <Tooltip label='Select & Transform Shapes' bg='red.600'>
        <Button
          onClick={() => setSelectedMode('transform')}

          // variant='outline'
          variant='plain'
        color="white"
        borderColor="white"
        _hover={{ color: "#4CAF50", borderColor: "#4CAF50" }}
          // isActive={selectedMode === "transform"}
          style={selectedMode === "transform" ? { color:"#4CAF50" }:{}}
        >
          <Move />
        </Button>
        </Tooltip>
        <Spacer />
        <Divider />
        <Spacer />
        <Tooltip label='Add Text' bg='red.600'>
        <Button
          aria-label='Text'
          color="white"
          borderColor="white"
          variant='plain'
          onClick={() => createShape('text')}
          _hover={{ color: "#4CAF50" }}
          // size='lg'
          >
          <Type />
        </Button>
        </Tooltip>
        <Tooltip label='Add Rectangle' bg='red.600'>
        <Button
          aria-label='Rectangle'
          color="white"
          borderColor="white"
          variant='plain'
          onClick={() => createShape('rectangle')}
          _hover={{ color: "#4CAF50" }}
          // size='lg'
        >
          <RectangleHorizontal />
        </Button>
        </Tooltip>

        <Tooltip label='Add Circle' bg='red.600'>
        <Button
          aria-label='Circle'
          color="white"
          borderColor="white"
          variant='plain'
          onClick={() => createShape('circle')}
          _hover={{ color: "#4CAF50" }}
          // size='lg'
        >
          <Circle />
        </Button>
        </Tooltip>

        <Tooltip label='Add Line' bg='red.600'>
        <Button
          aria-label='Line'
          color="white"
          borderColor="white"
          variant='plain'
          onClick={() => createShape('line')}
          _hover={{ color: "#4CAF50" }}
          // size='lg'
        >
          <Minus />
        </Button>
        </Tooltip>

        <Tooltip label='Add Triangle' bg='red.600'>
        <Button
          aria-label='Triangle'
          color="white"
          borderColor="white"
          variant='plain'
          onClick={() => createShape('triangle')}
          _hover={{ color: "#4CAF50" }}
          // size='lg'
          >
          <Triangle />
        </Button>
        </Tooltip>
        <Spacer />
        <Divider />
        <Spacer />
        
        <ColorPicker />
        <Spacer />
        {/* <Tooltip label='Stroke Size' bg='red.600'> */}
        <Slider
         minH='32'
          orientation='vertical'
          value={brushProperties.brushSize}
          min={1}
          max={100}
          onChange={(v) => updateBrushProperties('brushSize', v)}
        >
          {/* <Tooltip label='Stroke Size' bg='red.600'> */}
          <SliderMark
          value={brushProperties.brushSize}
          textAlign='center'
          // bg='red.600'
          color='#4CAF50'
          // mt='-10'
          ml='-4'
          mb='-3'
          w='12'
        >
          {brushProperties.brushSize}
        </SliderMark>
        <Tooltip label='Stroke Size' bg='red.600'>
          <SliderTrack bg='grey'>
            <SliderFilledTrack bg="#4CAF50" />
          </SliderTrack>
  
          </Tooltip>
          <SliderThumb />
        </Slider>
        {/* </Tooltip> */}
      </Box>
    </div>
  )
};

export default Toolbar;
