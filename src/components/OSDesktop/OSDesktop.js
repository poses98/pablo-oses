import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { sendGAEvent } from '@next/third-parties/google';
import { tree as staticTree } from '@/resources/tree';

export default function OSDesktop({ icons }) {
  const { spawnWindow, tree } = useWindowsContext();
  const nodes = tree && tree.length > 0 ? tree : staticTree;
  return (
    <div className={styles.container}>
      {nodes.map((element, index) => {
        return (
          <OSIcon
            key={index}
            name={element.name}
            type={element.type}
            containerStyle={{ animationDelay: `${0.4 + index * 0.07}s` }}
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
