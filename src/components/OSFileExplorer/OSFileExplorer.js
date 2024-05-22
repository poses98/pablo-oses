import { useEffect } from 'react';
import OSFileExplorerContent from './OSFileExplorerContent/OSFileExplorerContent';
import OSFileExplorerIndex from './OSFileExplorerIndex/OSFileExplorerIndex';
import styles from './osfileexplorer.module.css';

export default function OSFileExplorer({
  route,
  content,
  windowContentHeight,
  animated,
}) {
  useEffect(() => {}, [windowContentHeight]);

  return (
    <div
      className={styles.container}
      style={{ height: `${windowContentHeight}px` }}
    >
      <div className={styles.explorerRouteContainer}>
        <input
          type="text"
          value={`/${route}`}
          className={styles.explorerRouteField}
          disabled
        />
      </div>
      <div className={styles.explorerContentContainer}>
        <div
          className={styles.explorerIndex}
          style={{ overflow: animated ? 'hidden' : 'scroll' }}
        >
          <OSFileExplorerIndex route={route} />
        </div>
        <div
          className={styles.explorerShowcase}
          style={{ overflow: animated ? 'hidden' : 'scroll' }}
        >
          <OSFileExplorerContent content={content} />
        </div>
      </div>
    </div>
  );
}
