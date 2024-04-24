import { useEffect, useState } from 'react';
import { useWindowsContext } from '@/providers/WindowsProvider';
import Image from 'next/image';
import OSProjectRenderer from '../OSProjectRenderer/OSProjectRenderer';
import { IoMdClose } from 'react-icons/io';
import { iconProvider } from '@/utils/iconProvider';
import styles from './osbrowser.module.css';

import dynamic from 'next/dynamic';
import PDFToolbar from '../PDFToolbar/PDFToolbar';

const OSPdfRenderer = dynamic(() => import('../OSPdfRenderer/OSPdfRenderer'), {
  ssr: false,
});

export default function OSBrowser() {
  const { openedBrowser, windows, handleBrowserActiveTabChange } =
    useWindowsContext();

  const [activeTab, setActiveTab] = useState({});

  useEffect(() => {
    const activeBrowser = windows.find((w) => w.id === openedBrowser);
    const activeTab = activeBrowser.content.filter(
      (tab) => tab.id === activeBrowser.activeTabId
    );
    setActiveTab(activeTab[0]);
  }, [windows, openedBrowser]);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

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
      {activeTab.type === 'pdf' && <PDFToolbar />}
      <div className={styles.browserContent}>
        {activeTab.type === 'pdf' && (
          <>
            <OSPdfRenderer route={activeTab.content} />
          </>
        )}
        {activeTab.type === 'project' && (
          <OSProjectRenderer route={activeTab.content} />
        )}
      </div>
    </div>
  );
}
