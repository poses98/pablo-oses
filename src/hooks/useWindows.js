import { useState, useCallback } from 'react';

export function useWindows() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(0);
  const [nextId, setNextId] = useState(0);
  const [openedBrowser, setOpenedBrowser] = useState(null);

  const spawnWindow = useCallback(
    (node) => {
      const windowContent = {
        name: node.name,
        type: node.type,
        route: node.route,
        content: node.content,
      };
      if (node.type === 'pdf' || node.type === 'project') {
        const browserItem = {
          id: nextId,
          type: 'browser',
          name: 'Browser',
          content: [{ id: 0, ...windowContent }],
          activeTabId: 0,
        };
        if (openedBrowser === null) {
          setOpenedBrowser(nextId);
          setWindows((prevWindows) => [...prevWindows, browserItem]);
          setActiveWindowId(nextId);
          setNextId(nextId + 1);
        } else {
          const tabId = Math.floor(Math.random() * 1000);
          setWindows((prevWindow) =>
            prevWindow.map((win) => {
              if (win.id === openedBrowser) {
                return {
                  ...win,
                  content: [...win.content, { id: tabId, ...windowContent }],
                  activeTabId: tabId,
                };
              }
              return win;
            })
          );
          setActiveWindowId(openedBrowser);
        }
      } else if (windows.length < 8) {
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
    setWindows((prevWindows) => {
      const newWindows = prevWindows.filter((window) => window.id !== id);
      const isBrowser = newWindows.some((window) => window.type === 'browser');
      if (!isBrowser) {
        setOpenedBrowser(null);
      }
      return newWindows;
    });
  }, []);

  const handleWindowContentChange = useCallback(
    (node) => {
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

  const handleBrowserActiveTabChange = useCallback(
    (id) => {
      setWindows((prevWindows) =>
        prevWindows.map((window) => {
          if (window.id === openedBrowser) {
            return {
              ...window,
              activeTabId: id,
            };
          }
          return window;
        })
      );
    },
    [setWindows, openedBrowser]
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
    openedBrowser,
    setActiveWindowId,
    handleWindowClose,
    handleWindowContentChange,
    handleWindowFocus,
    handleBrowserActiveTabChange,
  };
}
