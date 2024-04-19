import { useEffect, useState } from 'react';
import styles from './taskbar.module.css';
import { Roboto_Mono } from 'next/font/google';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { iconProvider } from '@/utils/iconProvider';
import Image from 'next/image';
import ContextualMenu from './ContextualMenu/ContextualMenu';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function TaskBar() {
  const { windows, setActiveWindowId, activeWindowId } = useWindowsContext();
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.homeButton}>
          <p>P</p>
        </div>
        <div className={styles.tabBar}>
          {windows.map((window, index) => {
            return (
              <div
                className={`${styles.tabItem} ${
                  window.id === activeWindowId ? styles.selectedItem : ''
                }`}
                key={index}
                onClick={() => setActiveWindowId(window.id)}
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
}
