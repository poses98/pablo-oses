import { useState, useCallback } from 'react';

export function useWindows() {
  const [windows, setWindows] = useState([]);

  const spawnWindow = useCallback(
    (node) => {
      const windowContent = {
        name: node.name,
        type: node.type,
        route: node.route,
        content: node.content,
      };
      if (windows.length < 8) {
        setWindows((prevWindows) => [
          ...prevWindows,
          { id: prevWindows.length, ...windowContent },
        ]);
      } else {
        alert('Max window number');
      }
    },
    [windows]
  );

  const handleWindowClose = useCallback((id) => {
    setWindows((prevWindows) =>
      prevWindows.filter((window, index) => index !== id)
    );
  }, []);

  const handleWindowContentChange = useCallback((node, id) => {
    setWindows((prevWindows) =>
      prevWindows.map((window) => {
        if (window.id === id) {
          return {
            ...window,
            name: node.name,
            type: node.type,
            route: node.route,
            content: node.content,
          };
        }
        return window;
      })
    );
  }, []);

  return { windows, spawnWindow, handleWindowClose, handleWindowContentChange };
}
