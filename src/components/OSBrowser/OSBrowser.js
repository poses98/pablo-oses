import { useWindowsContext } from '@/providers/WindowsProvider';
import styles from './osbrowser.module.css';
import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { iconProvider } from '@/utils/iconProvider';

export default function OSBrowser() {
  const { openedBrowser, windows, handleBrowserActiveTabChange } =
    useWindowsContext();

  useEffect(() => {
    console.log(windows.find((w) => w.id === openedBrowser));
  }, [windows, openedBrowser]);

  return (
    <div className={styles.container}>
      <div className={styles.browserTabBar}>
        {windows
          .find((w) => w.id === openedBrowser)
          .content.map((tab) => {
            return (
              <div
                key={tab.id}
                className={`${styles.browserTab} ${
                  windows.find((w) => w.id === openedBrowser).activeTabId ===
                  tab.id
                    ? styles.activeTab
                    : ''
                }`}
                onClick={() => handleBrowserActiveTabChange(tab.id)}
              >
                <Image
                  src={iconProvider(tab.type)}
                  width={17}
                  height={17}
                  alt={tab.type}
                />
                <p>{tab.name}</p>
                <IoMdClose
                  style={{ minWidth: '20px' }}
                  className={styles.closeTabIcon}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
