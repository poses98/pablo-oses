import { useEffect, useRef } from 'react';
import { useWindowsContext } from '@/providers/WindowsProvider';
import Image from 'next/image';
import OSProjectRenderer from '../OSProjectRenderer/OSProjectRenderer';
import { IoMdClose } from 'react-icons/io';
import { FiLock, FiExternalLink, FiDownload } from 'react-icons/fi';
import { iconProvider } from '@/utils/iconProvider';
import styles from './osbrowser.module.css';

import dynamic from 'next/dynamic';

const OSPdfRenderer = dynamic(() => import('../OSPdfRenderer/OSPdfRenderer'), {
  ssr: false,
});

const HOST = 'pablooses.com';

const slugify = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const hasLiveUrl = (url) => Boolean(url) && url !== 'none';

// Path shown in the fake address bar for the active tab.
function addressFor(tab) {
  if (!tab) return '';
  if (tab.type === 'pdf') return tab.content;
  return `/projects/${slugify(tab.name)}`;
}

export default function OSBrowser() {
  const {
    openedBrowser,
    windows,
    handleBrowserActiveTabChange,
    handleTabClose,
  } = useWindowsContext();

  const browser = windows?.find((w) => w.id === openedBrowser);
  const tabs = browser?.content || [];
  const activeTab =
    tabs.find((tab) => tab.id === browser?.activeTabId) || tabs[0];

  // Keep the active tab visible when the tab strip overflows (mobile).
  const tabBarRef = useRef(null);
  useEffect(() => {
    const el = tabBarRef.current?.querySelector('[aria-selected="true"]');
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeTab?.id]);

  if (!browser) return null;

  const liveUrl = hasLiveUrl(activeTab?.url) ? activeTab.url : null;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.tabBar} ${tabs.length === 1 ? styles.singleTab : ''}`}
        role="tablist"
        ref={tabBarRef}
      >
        {tabs.map((tab) => {
          const isActive = activeTab?.id === tab.id;
          return (
            <div
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              title={tab.name}
              className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
              onClick={() => handleBrowserActiveTabChange(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleBrowserActiveTabChange(tab.id);
                }
              }}
            >
              <Image
                src={tab.icon || iconProvider(tab.type)}
                width={16}
                height={16}
                alt=""
                className={styles.tabIcon}
              />
              <span className={styles.tabName}>{tab.name}</span>
              <button
                type="button"
                aria-label={`Close ${tab.name}`}
                className={styles.closeTab}
                onClick={(e) => {
                  // Without this the click bubbles to the tab and re-activates it.
                  e.stopPropagation();
                  handleTabClose(tab.id);
                }}
              >
                <IoMdClose />
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.addressBar}>
          <FiLock className={styles.lock} aria-hidden />
          <span className={styles.address}>
            <span className={styles.host}>{HOST}</span>
            <span className={styles.path}>{addressFor(activeTab)}</span>
          </span>
        </div>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live site"
            className={styles.toolbarAction}
          >
            <FiExternalLink aria-hidden />
            <span>Live site</span>
          </a>
        )}
        {activeTab?.type === 'pdf' && (
          <a
            href={activeTab.content}
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label="Download PDF"
            className={styles.toolbarAction}
          >
            <FiDownload aria-hidden />
            <span>Download</span>
          </a>
        )}
      </div>

      <div className={styles.content}>
        {activeTab?.type === 'pdf' && (
          <OSPdfRenderer route={activeTab.content} />
        )}
        {activeTab?.type === 'project' && (
          <OSProjectRenderer
            key={activeTab.id}
            contentTree={activeTab.content}
            style={activeTab.style}
            activeTab={activeTab}
          />
        )}
      </div>
    </div>
  );
}
