import { tree } from '@/resources/tree';
import { useState, useCallback, useEffect } from 'react';
import { getProjects } from '../../sanity/sanity-utils';

export function useWindows() {
  const [windows, setWindows] = useState([{ ...tree[0], id: 0 }]);
  const [activeWindowId, setActiveWindowId] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [openedBrowser, setOpenedBrowser] = useState(null);
  const [activeBrowserTab, setActiveBrowserTab] = useState(-1);

  useEffect(() => {
    handleBrowserActiveTabChange(activeBrowserTab);
    return () => {};
  }, [activeBrowserTab]);

  const spawnWindow = useCallback(
    (node) => {
      const windowContent = {
        name: node.name,
        type: node.type,
        route: node.route,
        content: node.content,
        icon: node.icon,
        maximize: false,
        style: node.style,
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

  const handleWindowMinimize = useCallback((id) => {
    setWindows((prevWindows) => {
      return prevWindows.map((window) => {
        if (window.id === id) {
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

  const handleTabClose = useCallback(
    (id) => {
      let nextTab = -1;
      setWindows((prevWindow) =>
        prevWindow.map((win) => {
          if (win.id === openedBrowser) {
            const newContent = win.content.filter(
              (contentItem) => contentItem.id !== id
            );
            let newActiveTabId = win.activeTabId;
            // If the closed tab was the active one, change activeTabId

            // Find the index of the closed tab
            const closedTabIndex = win.content.findIndex(
              (contentItem) => contentItem.id === id
            );

            // If it's not the first tab, set activeTabId to the previous one
            if (closedTabIndex > 0 && win.content.length > 1) {
              nextTab = win.content[closedTabIndex - 1].id;
            }
            // If it's the first tab and there are more tabs, set activeTabId to the next one
            else if (win.content.length > 1) {
              nextTab = win.content[closedTabIndex + 1].id;
            } else if (win.content.length === 1) {
              nextTab = win.content[0].id;
            }
            setActiveBrowserTab(nextTab);

            return {
              ...win,
              content: newContent,
              activeTabId: nextTab,
            };
          }
          return win;
        })
      );
    },
    [openedBrowser, handleBrowserActiveTabChange]
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
