import { useState, useRef, useEffect } from 'react';
import WindowTaskbar from './WindowTaskbar/WindowTaskbar';
import styles from './oswindow.module.css';
import OSFileExplorer from '../OSFileExplorer/OSFileExplorer';
import OSNotepad from '../OSNotepad/OSNotepad';
import { useWindowsContext } from '@/providers/WindowsProvider';

export default function OSWindow({
  name,
  type,
  route,
  content,
  id,
  handleClose,
}) {
  const { handleWindowFocus } = useWindowsContext();
  const [windowContentHeight, setWindowContentHeight] = useState(0);
  const windowRef = useRef();
  const windowHeaderRef = useRef();

  useEffect(() => {
    if (windowRef.current && windowHeaderRef.current) {
      const availableContentHeight =
        windowRef.current.offsetHeight - windowHeaderRef.current.offsetHeight;
      setWindowContentHeight(availableContentHeight);
    }
    return () => {};
  }, [windowRef]);

  return (
    <div
      className={styles.container}
      ref={windowRef}
      onMouseEnter={() => handleWindowFocus(id)}
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
      </div>
    </div>
  );
}
