import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { sendGAEvent } from '@next/third-parties/google';
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
            onClick={() => {
              sendGAEvent({ event: 'dektop_icon_opened', value: element.name });
              spawnWindow(element);
            }}
          />
        );
      })}
    </div>
  );
}
