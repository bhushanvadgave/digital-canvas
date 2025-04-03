import { ChakraProvider, Flex, Box } from '@chakra-ui/react'
import { CanvasArea } from './CanvasArea.jsx'
import { Toolbar } from './Toolbar.jsx'
// import { HistoryTimeline } from './HistoryTimeline.jsx'
import { useStore } from './store.js'

export default function App() {
  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Toolbar />
        <Flex flex={1} position="relative">
          <CanvasArea />
          {/* <HistoryTimeline /> */}
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}