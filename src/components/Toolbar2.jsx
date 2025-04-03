import React from 'react';
import useStore from './store';
import { Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text, Spacer, Divider, Stack, Tooltip } from '@chakra-ui/react'
import { Brush, Eraser, Pipette as Eyedropper, Shapes, Triangle, RectangleHorizontal, Circle, Minus, Download, Move, Undo2, Redo2, ImageDown } from 'lucide-react'
import ColorPicker from './ColorPicker';

const Toolbar2 = () => {

  const { selectedColor, setSelectedColor, selectedMode, setSelectedMode, createShape, brushProperties, updateBrushProperties, exportAsPNG, undo, redo, history, historyIndex } = useStore();

  return (
    <div className='toolbar2'>
      <Box p={4} display="flex" flexDirection="column" gap={4}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Tooltip label='Undo' bg='red.600'>
            <Button
              onClick={undo}
              isDisabled={historyIndex <= 0}
              // variant='outline'
              variant='plain'
              color="white"
              // borderColor="white"
              // margin="auto"
              _hover={{ color: "#4CAF50", borderColor: "#4CAF50" }}
            // leftIcon={<Undo size={16} />}
            // title="Undo (Ctrl+Z)"
            >
              <Undo2 />
            </Button>
          </Tooltip>
          <Text color="white" style={{ textAlign: 'center' }}>
            {historyIndex + 1}/{history.length}
          </Text>
          <Tooltip label='Redo' bg='red.600'>
            <Button
              onClick={redo}
              isDisabled={historyIndex >= history.length - 1}
              // variant='outline'
              variant='plain'
              color="white"
              // borderColor="white"
              // margin="auto"
              _hover={{ color: "#4CAF50", borderColor: "#4CAF50" }}
            // leftIcon={<Redo size={16} />}
            // title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
            >
              <Redo2 />
            </Button>
          </Tooltip>
        </Box>
        <Spacer />
        <Divider />
        <Spacer />
        <Box display="flex" flexDirection="column" gap={4}>
        <Tooltip label='Export as PNG' bg='red.600'>
          <Button
            onClick={exportAsPNG}
            // leftIcon={<Download size={16} />}
            // ml="auto" // Pushes button to right
            // variant='outline'
            variant='plain'
            color="white"
            // borderColor="white"
            // margin="auto"
            _hover={{ color: "#4CAF50", borderColor: "#4CAF50" }}
          >
            <Download />
          </Button>
        </Tooltip>
        </Box>
      
      <Spacer />
        <Divider />
        <Spacer />
      <div className='logo' style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Box display="flex" flexDirection="column" alignItems="center" height="100%"> */}
        <div className='logo-text'>
          PIXELART
        </div>
        {/* </Box> */}
      </div>
      </Box>
    </div>
  )
};

export default Toolbar2;
