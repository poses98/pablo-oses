import { useState, useRef, useEffect } from 'react';
import WindowTaskbar from './WindowTaskbar/WindowTaskbar';
import styles from './oswindow.module.css';

export default function OSWindow({ name, type, handleClose }) {
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
    <div className={styles.container} ref={windowRef}>
      <div ref={windowHeaderRef}>
        <WindowTaskbar name={name} type={type} handleClose={handleClose} />
      </div>
      <div
        className={styles.windowContent}
        style={{ height: windowContentHeight }}
      ></div>
    </div>
  );
}
