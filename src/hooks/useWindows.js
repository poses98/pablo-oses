import { useState, useCallback, useEffect } from 'react';

export function useWindows() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(0);
  const [nextId, setNextId] = useState(0);

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
          { id: nextId, ...windowContent },
        ]);
        setActiveWindowId(nextId);
        setNextId(nextId + 1);
      } else {
        alert('Max window number');
      }
    },
    [windows, nextId]
  );

  const handleWindowClose = useCallback((id) => {
    setWindows((prevWindows) =>
      prevWindows.filter((window, index) => window.id !== id)
    );
  }, []);

  const handleWindowContentChange = useCallback(
    (node) => {
      console.log(activeWindowId);
      setWindows((prevWindows) =>
        prevWindows.map((window) => {
          if (window.id === activeWindowId) {
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
    },
    [activeWindowId, setWindows]
  );

  const handleWindowFocus = useCallback(
    (id) => {
      setActiveWindowId(id);
    },
    [setActiveWindowId]
  );

  return {
    windows,
    activeWindowId,
    spawnWindow,
    setActiveWindowId,
    handleWindowClose,
    handleWindowContentChange,
    handleWindowFocus,
  };
}
