import React, { useState, useEffect, useRef} from 'react';
import useStore from './store';
import { SketchPicker } from 'react-color';
import { Tooltip } from '@chakra-ui/react';

const ColorPickerX = ({ }) => {
  const { selectedColor, setSelectedColor, selectedMode, setSelectedMode } = useStore();

  const handleColorChange = (event) => {
    const newColor = event.hex;
    setSelectedColor(newColor);
  };


  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);


  // Toggle popup visibility
  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    // <div className="color-picker">
    //   <input
    //     type="color"
    //     value={selectedColor}
    //     onChange={handleColorChange}
    //   />
    // </div>

    <div style={{ position: "relative", display: "inline-block", textAlign: "center"}}>
      {/* Button-like input with color preview */}
      <Tooltip label='Pick Color' bg='red.600'>
      <button
        onClick={togglePicker}
        style={{
          backgroundColor: selectedColor,
          border: "1px solid #ccc",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          borderColor: "white",
          borderWidth: "2px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        />
      </Tooltip>
      {/* Popup with SketchPicker */}
      {showPicker && (
        <div
          ref={pickerRef}
          style={{
            position: "absolute",
            // top: "40px",
            bottom: "0px",
            // left: "0",
            left: "80px",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <SketchPicker color={selectedColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPickerX;
