import { useState, useRef, useEffect } from 'react';
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
}) {
  const { handleWindowFocus, activeWindowId } = useWindowsContext();
  const [windowContentHeight, setWindowContentHeight] = useState(0);
  const windowRef = useRef();
  const windowHeaderRef = useRef();

  useEffect(() => {
    if (windowRef.current && windowHeaderRef.current) {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      const centerPosition = {
        x: vw / 2.5 - windowRef.current.offsetWidth / 2,
        y: vh / 2.5 - windowRef.current.offsetHeight / 2,
      };

      const newPosition = {
        x: centerPosition.x + id * windowHeaderRef.current.offsetHeight,
        y: centerPosition.y + id * windowHeaderRef.current.offsetHeight,
      };
      if (type !== 'browser') {
        windowRef.current.style.top = `${newPosition.y}px`;
        if (vw > 600) {
          // Set the window position
          windowRef.current.style.left = `${newPosition.x}px`;
        }
      } else if (type === 'browser') {
        windowRef.current.style.height = `${vh - 40}px`;
        windowRef.current.style.width = `${vw}px`;
        windowRef.current.style.top = 0;
        windowRef.current.style.left = 0;
      }

      const availableContentHeight =
        windowRef.current.offsetHeight - windowHeaderRef.current.offsetHeight;
      setWindowContentHeight(availableContentHeight);
    }
    return () => {};
  }, [windowRef, id, type]);

  return (
    <div
      className={`${styles.container} ${
        activeWindowId === id ? styles.activeWindow : ''
      }`}
      ref={windowRef}
      onClick={() => handleWindowFocus(id)}
    >
      <div ref={windowHeaderRef}>
        <WindowTaskbar name={name} type={type} handleClose={handleClose} />
      </div>
      <div
        className={styles.windowContent}
        style={{ height: windowContentHeight }}
      >
        {type === 'folder' && (
          <OSFileExplorer route={route} content={content} />
        )}
        {type === 'text' && <OSNotepad content={content} />}
        {type === 'browser' && (
          <OSBrowser windowContentHeight={windowContentHeight} />
        )}
      </div>
    </div>
  );
}
