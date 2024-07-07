import { useEffect, useState, useRef, forwardRef } from 'react';
import styles from './taskbar.module.css';
import { Roboto_Mono } from 'next/font/google';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { iconProvider } from '@/utils/iconProvider';
import Image from 'next/image';
import ContextualMenu from './ContextualMenu/ContextualMenu';
import exp from 'constants';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

const TaskBar = forwardRef((props, ref) => {
  TaskBar.displayName = 'TaskBar';
  const { windows, setActiveWindowId, activeWindowId, handleWindowDeMinimize } =
    useWindowsContext();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [hourSet, setHourSet] = useState(false);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setHour(String(date.getHours()).padStart(2, '0'));
      setMinutes(String(date.getMinutes()).padStart(2, '0'));
      setSeconds(String(date.getSeconds()).padStart(2, '0'));
      setHourSet(true);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const contextualMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        contextualMenuRef.current &&
        !contextualMenuRef.current.contains(event.target)
      ) {
        setContextMenuVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {contextMenuVisible && <ContextualMenu ref={contextualMenuRef} />}
      <div className={styles.container} ref={ref}>
        <div
          className={styles.homeButton}
          onClick={() => setContextMenuVisible((prevState) => !prevState)}
        >
          <p>P</p>
        </div>
        <div className={styles.tabBar}>
          {windows.map((window, index) => {
            return (
              <div
                className={`${styles.tabItem} ${
                  window.id === activeWindowId && !window.minimize
                    ? styles.selectedItem
                    : ''
                }`}
                key={index}
                onClick={() => {
                  setActiveWindowId(window.id);
                  handleWindowDeMinimize(window.id);
                }}
              >
                <Image
                  src={iconProvider(window.type)}
                  width={30}
                  height={30}
                  alt={'tabIcon'}
                />
                <p className={`${styles.tabItemText}`}>{window.name}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.taskBarIcons}>
          {hourSet && (
            <p
              className={robotoMono.className}
            >{`${hour}:${minutes}:${seconds}`}</p>
          )}
        </div>
      </div>
    </>
  );
});

export default TaskBar;
