import React, { createContext, useContext } from 'react';
import { useWindows } from '@/hooks/useWindows';

const WindowsContext = createContext();

export function WindowsProvider({ children, initialTree }) {
  const {
    tree,
    windows,
    activeWindowId,
    spawnWindow,
    handleWindowContentChange,
    handleWindowFocus,
    handleWindowClose,
    setActiveWindowId,
    openedBrowser,
    handleBrowserActiveTabChange,
    handleWindowMinimize,
    handleWindowMaximize,
    handleWindowDeMinimize,
    handleWindowMove,
    handleWindowResize,
    handleWindowSnap,
    handleBrowserFocus,
    handleTabClose,
  } = useWindows(initialTree);
  return (
    <WindowsContext.Provider
      value={{
        tree,
        windows,
        activeWindowId,
        spawnWindow,
        handleWindowContentChange,
        handleWindowFocus,
        handleWindowClose,
        setActiveWindowId,
        openedBrowser,
        handleBrowserActiveTabChange,
        handleWindowMinimize,
        handleWindowMaximize,
        handleWindowDeMinimize,
        handleWindowMove,
        handleWindowResize,
        handleWindowSnap,
        handleBrowserFocus,
        handleTabClose,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindowsContext() {
  return useContext(WindowsContext);
}
