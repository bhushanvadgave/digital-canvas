import React, { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
// import ColorPicker from './components/ColorPicker';
import { ChakraProvider, Flex, Box} from '@chakra-ui/react'
import * as fabric from 'fabric';
import './App.css';
import useStore from './components/store';
// import { HistoryControls } from './components/HistoryControls.jsx';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.jsx';
import Toolbar2 from './components/Toolbar2';


const App = () => {
  useKeyboardShortcuts(); // Initialize keyboard shortcuts

  return (
    // <ChakraProvider>
    //   <div className='canvas-page'>
    //   <Flex h="100vh" direction="column">
    //     <Toolbar/>
    //     <Flex flex={1} position="relative">
    //       <Canvas />
    //     </Flex>
    //   </Flex>
    //   </div>
    // </ChakraProvider>


    <ChakraProvider>
    <div className='canvas-page'>
    <Flex h="100vh">
      <Toolbar/>
      {/* <Flex flex={1} position="relative"> */}
        <Canvas />
        <Toolbar2/>
      </Flex>
    {/* </Flex> */}
    </div>
  </ChakraProvider>
  );
};

export default App;
