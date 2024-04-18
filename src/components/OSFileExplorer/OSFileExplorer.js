import OSFileExplorerContent from './OSFileExplorerContent/OSFileExplorerContent';
import OSFileExplorerIndex from './OSFileExplorerIndex/OSFileExplorerIndex';
import styles from './osfileexplorer.module.css';

export default function OSFileExplorer({ route, content }) {
  return (
    <div className={styles.container}>
      <div className={styles.explorerRouteContainer}>
        <input
          type="text"
          value={`/${route}`}
          className={styles.explorerRouteField}
          disabled
        />
      </div>
      <div className={styles.explorerContentContainer}>
        <div className={styles.explorerIndex}>
          <OSFileExplorerIndex route={route} />
        </div>
        <div className={styles.explorerShowcase}>
          <OSFileExplorerContent content={content} />
        </div>
      </div>
    </div>
  );
}
