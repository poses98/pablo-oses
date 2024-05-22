import { useState, useEffect } from 'react';
import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { tree } from '@/resources/tree';
import { getFolders } from '../../../sanity/sanity-utils';
import { adaptRoot } from '@/utils/adapters';

export default function OSDesktop({ icons }) {
  const { spawnWindow } = useWindowsContext();
  const [root, setRoot] = useState([]);
  useEffect(() => {
    const project = async () =>
      getFolders().then((projects) => {
        setRoot(adaptRoot(projects));
      });

    project();
  }, []);
  useEffect(() => {
    console.log('projects', root);
  }, [root]);
  return (
    <div className={styles.container}>
      {root &&
        root.map((element, index) => {
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
