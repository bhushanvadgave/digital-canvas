import { Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from '@chakra-ui/react'
import { useStore } from './store'
import { Brush, Eraser, Pipette as Eyedropper, Shapes} from 'lucide-react'

export function Toolbar() {
  const { tools, setTool, updateBrush } = useStore()

  const toolsConfig = [
    { id: 'brush', icon: <Brush />, shortcut: 'B' },
    { id: 'eraser', icon: <Eraser />, shortcut: 'E' },
    { id: 'eyedropper', icon: <Eyedropper />, shortcut: 'I' },
    { id: 'shapes', icon: <Shapes />, shortcut: 'S' },
  ]

  return (
    <Box p={4} borderBottom="1px solid #eee" display="flex" gap={4}>
      {toolsConfig.map((tool) => (
        <Button
          key={tool.id}
          onClick={() => setTool(tool.id)}
          isActive={tools.active === tool.id}
        >
          {tool.icon}
        </Button>
      ))}
      
      <Slider 
        value={tools.brushSize} 
        min={1} 
        max={100}
        onChange={(v) => updateBrush('brushSize', v)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Slider 
        value={tools.brushOpacity * 100}
        min={1} 
        max={100}
        onChange={(v) => updateBrush('brushOpacity', v/100)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}