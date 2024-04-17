import OSFileExplorerContent from '../OSFileExplorerContent/OSFileExplorerContent';
import styles from './osfileexplorer.module.css';

export default function OSFileExplorer({ route }) {
  return (
    <div className={styles.container}>
      <div className={styles.explorerRouteContainer}>
        <input type="text" className={styles.explorerRouteField} />
      </div>
      <div className={styles.explorerContentContainer}>
        <div className={styles.explorerIndex}>TODO</div>
        <div className={styles.explorerShowcase}>
          <OSFileExplorerContent />
        </div>
      </div>
    </div>
  );
}
