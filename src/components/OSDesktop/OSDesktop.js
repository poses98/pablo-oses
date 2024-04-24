import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { tree } from '@/resources/tree';

export default function OSDesktop({ icons }) {
  const { spawnWindow } = useWindowsContext();
  return (
    <div className={styles.container}>
      {tree.map((element, index) => {
        return (
          <OSIcon
            key={index}
            name={element.name}
            type={element.type}
            onClick={() => spawnWindow(element)}
          />
        );
      })}
    </div>
  );
}
