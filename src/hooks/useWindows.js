import { useState, useCallback, useEffect } from 'react';

export function useWindows() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(0);
  const [nextId, setNextId] = useState(0);
  const [openedBrowser, setOpenedBrowser] = useState(null);

  useEffect(() => {
    console.log('Active Window Changed');
    console.log(activeWindowId);

    return () => {
      console.log('unmount');
    };
  }, [activeWindowId]);

  const spawnWindow = useCallback(
    (node) => {
      const windowContent = {
        name: node.name,
        type: node.type,
        route: node.route,
        content: node.content,
        icon: node.icon,
        maximize: false,
      };
      if (node.type === 'pdf' || node.type === 'project') {
        const browserItem = {
          id: nextId,
          type: 'browser',
          name: 'Browser',
          content: [{ id: 0, ...windowContent }],
          activeTabId: 0,
          maximize: true,
        };
        if (openedBrowser === null) {
          setOpenedBrowser(nextId);
          setWindows((prevWindows) => [...prevWindows, browserItem]);
          // Timeout to setActiveWindow avoiding window click active window setting
          setTimeout(() => {
            setActiveWindowId(nextId);
          }, 1);
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
          handleBrowserFocus();
        }
      } else {
        setWindows((prevWindows) => [
          ...prevWindows,
          { id: nextId, ...windowContent },
        ]);
        setActiveWindowId(nextId);
        setNextId(nextId + 1);
      }
    },
    [nextId, openedBrowser]
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

  const handleTabClose = useCallback(
    (id) => {
      setWindows((prevWindow) =>
        prevWindow.map((win) => {
          if (win.id === openedBrowser) {
            const newContent = win.content.filter(
              (contentItem) => contentItem.id !== id
            );
            let newActiveTabId = win.activeTabId;
            // If the closed tab was the active one, change activeTabId
            if (win.activeTabId === id) {
              // Find the index of the closed tab
              const closedTabIndex = win.content.findIndex(
                (contentItem) => contentItem.id === id
              );

              console.log(win.content[closedTabIndex - 1].id);
              // If it's not the first tab, set activeTabId to the previous one
              if (closedTabIndex > 0) {
                handleBrowserActiveTabChange(
                  win.content[closedTabIndex - 1].id
                );
              }
              // If it's the first tab and there are more tabs, set activeTabId to the next one
              else if (win.content.length > 1) {
                handleBrowserActiveTabChange(
                  win.content[closedTabIndex + 1].id
                );
              }
            }

            return {
              ...win,
              content: newContent,
            };
          }
          return win;
        })
      );
    },
    [openedBrowser]
  );

  const handleWindowMinimize = useCallback((id) => {
    setWindows((prevWindows) => {
      console.log('Previous windows:', prevWindows);
      return prevWindows.map((window) => {
        if (window.id === id) {
          console.log('Found matching window. Setting minimize to true.');
          setActiveWindowId(100);
          return {
            ...window,
            minimize: true,
          };
        }
        return window;
      });
    });
  }, []);

  const handleWindowDeMinimize = useCallback((id) => {
    setWindows((prevWindows) =>
      prevWindows.map((window) => {
        if (window.id === id) {
          return {
            ...window,
            minimize: false,
          };
        }
        return window;
      })
    );
  }, []);

  const handleWindowMaximize = useCallback((id) => {
    setWindows((prevWindows) =>
      prevWindows.map((window) => {
        if (window.id === id) {
          return {
            ...window,
            maximize: !window.maximize,
          };
        }
        return window;
      })
    );
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

  const handleBrowserFocus = useCallback(() => {
    setTimeout(() => {
      setActiveWindowId(openedBrowser);
      handleWindowDeMinimize(openedBrowser);
    }, 50);
  }, [openedBrowser, handleWindowDeMinimize]);

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
    handleWindowMinimize,
    handleWindowMaximize,
    handleWindowDeMinimize,
    handleBrowserFocus,
    handleTabClose,
  };
}
