import React, { createContext, useContext } from 'react';
import { useWindows } from '@/hooks/useWindows';

// Create a context
const WindowsContext = createContext();

// Create a provider component that uses your hook
export function WindowsProvider({ children }) {
  const {
    windows,
    spawnWindow,
    handleWindowContentChange,
    handleWindowFocus,
    handleWindowClose,
  } = useWindows();
  return (
    <WindowsContext.Provider
      value={{
        windows,
        spawnWindow,
        handleWindowContentChange,
        handleWindowFocus,
        handleWindowClose,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}

// Create a custom hook to use the context
export function useWindowsContext() {
  return useContext(WindowsContext);
}
