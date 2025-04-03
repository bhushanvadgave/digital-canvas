import { useEffect } from 'react';
import useStore from '../components/store';

export const useKeyboardShortcuts = () => {
  const { undo, redo, setSelectedMode, deleteSelected} = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {

      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      
      // Delete key handler
      // if (e.key === 'Delete' || e.key === 'Backspace') {
      //   // console.log("delete");
      //   deleteSelected();
      //   e.preventDefault();
      // }

      console.log("e.key",e.key);
      console.log("cmdOrCtrl",cmdOrCtrl);

        // console.log("handleKeyDown");
      // Prevent default for all shortcut keys
      if (cmdOrCtrl) {
        // console.log("ctrlKey or metaKey");
        switch (e.key.toLowerCase()) {
          case 'z':
            // console.log("z");
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            e.preventDefault();
            break;
          case 'y':
            console.log("y");
            redo();
            e.preventDefault();
            break;
          case 'delete':
          case 'backspace':
            console.log("deleting");
            deleteSelected();
            e.preventDefault();
            break;
        }
      }

      // Tool shortcuts
      // switch (e.key.toLowerCase()) {
      //   case 'e':
      //       setSelectedMode('eraser');
      //     break;
      //   case 'b':
      //       setSelectedMode('brush');
      //     break;
      //   // Add other tool shortcuts as needed
      // }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, setSelectedMode]);
};