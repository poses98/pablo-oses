import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import WindowTaskbar from './WindowTaskbar/WindowTaskbar';
import styles from './oswindow.module.css';
import OSFileExplorer from '../OSFileExplorer/OSFileExplorer';
import OSNotepad from '../OSNotepad/OSNotepad';
import { useWindowsContext } from '@/providers/WindowsProvider';
import OSBrowser from '../OSBrowser/OSBrowser';

export default function OSWindow({
  name,
  type,
  route,
  content,
  id,
  handleClose,
  customWindow,
}) {
  const { handleWindowFocus, activeWindowId, windows } = useWindowsContext();
  const [prevCustomWindow, setPrevCustomWindow] = useState(customWindow);
  const [windowContentHeight, setWindowContentHeight] = useState(0);
  const [initialWindow, setInitialWindow] = useState({ width: 0, height: 0 });
  const windowRef = useRef();
  const windowHeaderRef = useRef();

  useLayoutEffect(() => {
    if (windowRef.current && windowHeaderRef.current) {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      let x, y, width, height, opacity;

      if (type !== 'browser' && !customWindow.maximize) {
        if (vw <= 600) {
          width = '100vw';
        } else {
          width = initialWindow.width || `${windowRef.current.offsetWidth}px`;
        }
        height = initialWindow.height || `${windowRef.current.offsetHeight}px`;
        x =
          initialWindow.x ||
          `${
            vw / 2.5 -
            parseInt(width) / 2 +
            (id % 6) * windowHeaderRef.current.offsetHeight
          }px`;
        y =
          initialWindow.y ||
          `${
            vh / 2.5 -
            parseInt(height) / 2 +
            (id % 6) * windowHeaderRef.current.offsetHeight
          }px`;

        setInitialWindow({ width, height, x, y });
      } else if (type === 'browser' || customWindow.maximize) {
        x = '0';
        y = '0';
        width = `${vw}px`;
        height = `${vh - 40}px`;
      }

      if (customWindow.minimize) {
        y = `${vh}px`;
        x = '0';
        width = '0px';
        height = '0px';
        opacity = '0';
      } else if (customWindow.maximize) {
        y = '0';
        x = '0';
        width = `${vw}px`;
        height = `${vh - 40}px`;
        opacity = '1';
      } else if (prevCustomWindow.minimize && !customWindow.minimize) {
        y = initialWindow.y;
        x = initialWindow.x;
        width = initialWindow.width;
        height = initialWindow.height;
        opacity = '1';
      } else if (prevCustomWindow.maximize && !customWindow.maximize) {
        y = initialWindow.y;
        x = initialWindow.x;
        width = initialWindow.width;
        height = initialWindow.height;
        opacity = '1';
      }

      Object.assign(windowRef.current.style, {
        top: y,
        left: vw > 600 ? x : undefined,
        width,
        height,
        transition: 'all 0.2s ease-in-out',
        opacity,
      });
      customWindow.animated = true;
      setTimeout(() => {
        if (windowRef.current && windowHeaderRef.current) {
          const availableContentHeight =
            windowRef.current.offsetHeight -
            windowHeaderRef.current.offsetHeight;
          setWindowContentHeight(availableContentHeight);
          customWindow.animated = false;
        }
      }, 200);
    }
    return () => {};
  }, [
    windowRef,
    id,
    type,
    customWindow,
    initialWindow.width,
    initialWindow.height,
    prevCustomWindow.maximize,
    initialWindow.x,
    initialWindow.y,
    prevCustomWindow.minimize,
  ]);

  useEffect(() => {
    setPrevCustomWindow(customWindow);
  }, [customWindow]);

  return (
    <div
      className={`${styles.container} ${
        activeWindowId === id ? styles.activeWindow : ''
      }`}
      ref={windowRef}
      onClick={() => handleWindowFocus(id)}
    >
      <div ref={windowHeaderRef}>
        <WindowTaskbar
          name={name}
          type={type}
          handleClose={handleClose}
          id={id}
        />
      </div>
      <div
        className={styles.windowContent}
        style={{ height: `${windowContentHeight}px` }}
      >
        {type === 'folder' && (
          <OSFileExplorer
            route={route}
            content={content}
            windowContentHeight={windowContentHeight}
            animated={customWindow.animated}
          />
        )}
        {type === 'text' && (
          <OSNotepad
            content={content}
            windowContentHeight={windowContentHeight}
          />
        )}
        {type === 'browser' && (
          <OSBrowser windowContentHeight={windowContentHeight} />
        )}
      </div>
    </div>
  );
}
