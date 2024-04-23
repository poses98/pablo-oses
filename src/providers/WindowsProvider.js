import React, { createContext, useContext } from 'react';
import { useWindows } from '@/hooks/useWindows';

const WindowsContext = createContext();

export function WindowsProvider({ children }) {
  const {
    windows,
    activeWindowId,
    spawnWindow,
    handleWindowContentChange,
    handleWindowFocus,
    handleWindowClose,
    setActiveWindowId,
    openedBrowser,
    handleBrowserActiveTabChange,
  } = useWindows();
  return (
    <WindowsContext.Provider
      value={{
        windows,
        activeWindowId,
        spawnWindow,
        handleWindowContentChange,
        handleWindowFocus,
        handleWindowClose,
        setActiveWindowId,
        openedBrowser,
        handleBrowserActiveTabChange,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindowsContext() {
  return useContext(WindowsContext);
}
