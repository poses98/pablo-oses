import Image from 'next/image';
import styles from './windowtaskbar.module.css';
import { useEffect, useState } from 'react';
import { iconProvider } from '@/utils/iconProvider';
import { useWindowsContext } from '@/providers/WindowsProvider';

export default function WindowTaskbar({ name, type, handleClose }) {
  const [windowIcon, setWindowIcon] = useState(null);
  const [browserTabs, setBrowserTabs] = useState([]);
  const { openedBrowser, windows } = useWindowsContext();

  useEffect(() => {
    setWindowIcon(iconProvider(type));
  }, [type]);

  useEffect(() => {
    if (openedBrowser !== null && windows[openedBrowser]) {
      setBrowserTabs(windows[openedBrowser].content);
    }
  }, [openedBrowser, windows]);

  return (
    <div className={styles.container}>
      <div className={styles.windowHeader}>
        {windowIcon && (
          <Image width={17} height={17} src={windowIcon} alt={'icon'} />
        )}

        <p className={styles.windowTitle}>{name}</p>
      </div>
      {type === 'browser' && (
        <div className={styles.browserTabBar}>
          {browserTabs.map((tab, index) => {
            return (
              <div key={index} className={styles.browserTab}>
                <p>{tab.name}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.windowActions}>
        <div className={styles.windowButton} onClick={handleClose}>
          <Image
            width={17}
            height={17}
            src={'/img/icons/close.svg'}
            alt={'X'}
          />
        </div>
      </div>
    </div>
  );
}
