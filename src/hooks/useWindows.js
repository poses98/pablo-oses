import { tree } from '@/resources/tree';
import { useState, useCallback, useEffect } from 'react';
import { getProjects } from '../../sanity/sanity-utils';

// Height reserved at the bottom for the floating dock/taskbar.
export const DOCK_RESERVED = 72;
const MIN_W = 360;
const MIN_H = 280;

// Viewport helpers (client-side only; spawn/snap run on user interaction).
function viewport() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  return { vw, vh };
}

// Geometry for a freshly spawned window: a comfortable size centred with a
// cascade offset so stacked windows don't perfectly overlap.
function computeInitialGeometry(id, type) {
  if (typeof window === 'undefined') {
    return { x: 80, y: 80, width: 720, height: 520 };
  }
  const { vw, vh } = viewport();
  if (type === 'browser') {
    return { x: 0, y: 0, width: vw, height: vh - DOCK_RESERVED };
  }
  const width = Math.round(Math.min(Math.max(vw * 0.46, MIN_W), 860));
  const height = Math.round(Math.min(Math.max(vh * 0.62, MIN_H), 720));
  const cascade = (id % 6) * 34;
  const x = Math.round(
    Math.min(Math.max(vw / 2 - width / 2 + cascade, 16), vw - width - 16)
  );
  const y = Math.round(
    Math.min(
      Math.max(vh / 2 - height / 2 - 20 + cascade, 16),
      vh - DOCK_RESERVED - height - 16
    )
  );
  return { x, y, width, height };
}

// Geometry for a snap zone: half-screen left/right, or full maximize.
function computeSnapGeometry(zone) {
  const { vw, vh } = viewport();
  const usableH = vh - DOCK_RESERVED;
  switch (zone) {
    case 'left':
      return { x: 0, y: 0, width: Math.round(vw / 2), height: usableH };
    case 'right':
      return {
        x: Math.round(vw / 2),
        y: 0,
        width: Math.round(vw / 2),
        height: usableH,
      };
    case 'maximize':
    default:
      return { x: 0, y: 0, width: vw, height: usableH };
  }
}

export function useWindows() {
  const [windows, setWindows] = useState([
    {
      ...tree[0],
      id: 0,
      geometry: computeInitialGeometry(0, tree[0].type),
      zIndex: 10,
      snap: null,
    },
  ]);
  const [activeWindowId, setActiveWindowId] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [topZ, setTopZ] = useState(10);
  const [openedBrowser, setOpenedBrowser] = useState(null);
  const [activeBrowserTab, setActiveBrowserTab] = useState(-1);

  useEffect(() => {
    handleBrowserActiveTabChange(activeBrowserTab);
    return () => {};
  }, [activeBrowserTab]);

  const spawnWindow = useCallback(
    (node) => {
      const newZ = topZ + 1;
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
          geometry: computeInitialGeometry(nextId, 'browser'),
          zIndex: newZ,
          snap: 'maximize',
        };
        if (openedBrowser === null) {
          setOpenedBrowser(nextId);
          setTopZ(newZ);
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
          {
            id: nextId,
            ...windowContent,
            geometry: computeInitialGeometry(nextId, node.type),
            zIndex: newZ,
            snap: null,
          },
        ]);
        setTopZ(newZ);
        setActiveWindowId(nextId);
        setNextId(nextId + 1);
      }
    },
    [nextId, openedBrowser, topZ]
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
      prevWindows.map((win) => {
        if (win.id !== id) return win;
        // Already maximized/snapped -> restore previous floating geometry.
        if (win.snap) {
          return {
            ...win,
            maximize: false,
            snap: null,
            geometry: win.geometryBeforeSnap || win.geometry,
            geometryBeforeSnap: undefined,
          };
        }
        return {
          ...win,
          maximize: true,
          snap: 'maximize',
          geometryBeforeSnap: win.geometry,
          geometry: computeSnapGeometry('maximize'),
        };
      })
    );
  }, []);

  // Commit a new position after dragging the title bar.
  const handleWindowMove = useCallback((id, x, y) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.id === id
          ? {
              ...win,
              geometry: { ...win.geometry, x, y },
              snap: null,
              maximize: false,
              geometryBeforeSnap: undefined,
            }
          : win
      )
    );
  }, []);

  // Commit a new geometry after resizing from an edge/corner.
  const handleWindowResize = useCallback((id, geometry) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.id === id
          ? {
              ...win,
              geometry,
              snap: null,
              maximize: false,
              geometryBeforeSnap: undefined,
            }
          : win
      )
    );
  }, []);

  // Snap to a screen zone (left/right half or maximize), or restore.
  const handleWindowSnap = useCallback((id, zone) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) => {
        if (win.id !== id) return win;
        if (zone === 'restore') {
          return {
            ...win,
            snap: null,
            maximize: false,
            geometry: win.geometryBeforeSnap || win.geometry,
            geometryBeforeSnap: undefined,
          };
        }
        return {
          ...win,
          snap: zone,
          maximize: zone === 'maximize',
          geometryBeforeSnap: win.geometryBeforeSnap || win.geometry,
          geometry: computeSnapGeometry(zone),
        };
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
      setTopZ((prevZ) => {
        const newZ = prevZ + 1;
        setWindows((prevWindows) =>
          prevWindows.map((win) =>
            win.id === id ? { ...win, zIndex: newZ } : win
          )
        );
        return newZ;
      });
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
    handleWindowMove,
    handleWindowResize,
    handleWindowSnap,
    handleBrowserFocus,
    handleTabClose,
  };
}
