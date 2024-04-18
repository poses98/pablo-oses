import OSFileExplorerContent from './OSFileExplorerContent/OSFileExplorerContent';
import styles from './osfileexplorer.module.css';

export default function OSFileExplorer({ route, content }) {
  return (
    <div className={styles.container}>
      <div className={styles.explorerRouteContainer}>
        <input
          type="text"
          value={route}
          className={styles.explorerRouteField}
        />
      </div>
      <div className={styles.explorerContentContainer}>
        <div className={styles.explorerIndex}>TODO</div>
        <div className={styles.explorerShowcase}>
          <OSFileExplorerContent content={content} />
        </div>
      </div>
    </div>
  );
}
