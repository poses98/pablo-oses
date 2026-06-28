import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import WindowTaskbar from './WindowTaskbar/WindowTaskbar';
import styles from './oswindow.module.css';
import OSFileExplorer from '../OSFileExplorer/OSFileExplorer';
import OSNotepad from '../OSNotepad/OSNotepad';
import { useWindowsContext } from '@/providers/WindowsProvider';
import OSBrowser from '../OSBrowser/OSBrowser';
import { useWindowDrag } from '@/hooks/useWindowDrag';

const RESIZE_DIRS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

export default function OSWindow({
  name,
  type,
  route,
  content,
  id,
  handleClose,
  customWindow,
}) {
  const {
    handleWindowFocus,
    activeWindowId,
    handleWindowMove,
    handleWindowResize,
    handleWindowSnap,
    handleWindowMaximize,
  } = useWindowsContext();

  const [headerHeight, setHeaderHeight] = useState(40);
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef();
  const windowHeaderRef = useRef();

  const geometry = customWindow.geometry || { x: 80, y: 80, width: 720, height: 520 };
  const isMaximized = customWindow.maximize || customWindow.snap === 'maximize';
  const interactive = !isMobile && !customWindow.minimize;

  // Detect small / touch viewports where free-floating windows don't make sense.
  useEffect(() => {
    const check = () => {
      const touch =
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth <= 768);
      setIsMobile(touch);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Measure the title bar so content areas can size their scroll regions.
  useLayoutEffect(() => {
    if (windowHeaderRef.current) {
      setHeaderHeight(windowHeaderRef.current.offsetHeight || 40);
    }
  }, [geometry.height, name]);

  const { startDrag, startResize, snapPreview } = useWindowDrag({
    windowRef,
    geometry,
    enabled: interactive,
    onMove: (x, y) => handleWindowMove(id, x, y),
    onResize: (geo) => handleWindowResize(id, geo),
    onSnap: (zone) => handleWindowSnap(id, zone),
    onFocus: () => handleWindowFocus(id),
  });

  const windowContentHeight = Math.max(
    (isMobile ? window?.innerHeight - 56 : geometry.height) - headerHeight,
    0
  );

  // Inline geometry: free-floating on desktop, full-bleed on mobile.
  const style = isMobile
    ? { zIndex: customWindow.zIndex || 10 }
    : {
        transform: `translate3d(${geometry.x}px, ${geometry.y}px, 0)`,
        width: `${geometry.width}px`,
        height: `${geometry.height}px`,
        zIndex: customWindow.zIndex || 10,
      };

  const containerClass = [
    styles.container,
    activeWindowId === id ? styles.activeWindow : '',
    isMobile ? styles.mobile : '',
    customWindow.minimize ? styles.minimized : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {snapPreview && (
        <div
          className={`${styles.snapPreview} ${styles[`snap-${snapPreview}`]}`}
        />
      )}
      <div
        className={containerClass}
        ref={windowRef}
        style={style}
        onPointerDown={() => handleWindowFocus(id)}
      >
        <div
          ref={windowHeaderRef}
          className={styles.header}
          onPointerDown={interactive && !isMaximized ? startDrag : undefined}
          onDoubleClick={
            interactive ? () => handleWindowMaximize(id) : undefined
          }
        >
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
              animated={false}
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

        {interactive && !isMaximized && (
          <div className={styles.resizeHandles}>
            {RESIZE_DIRS.map((dir) => (
              <div
                key={dir}
                className={`${styles.resizeHandle} ${styles[`resize-${dir}`]}`}
                onPointerDown={(e) => startResize(e, dir)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
