import OSIcon from '../../OSIcon/OSIcon';
import styles from './osfileexplorercontent.module.css';
import { useWindowsContext } from '@/providers/WindowsProvider';

export default function OSFileExplorerContent({ content }) {
  const { spawnWindow } = useWindowsContext();
  return (
    <div className={styles.container}>
      {content.map((e, index) => {
        return (
          <div className={styles.elementContainer} key={index}>
            <OSIcon
              nameStyles={{ marginTop: '5px' }}
              icon={e.icon}
              name={e.name}
              onClick={() => {
                spawnWindow(e);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
