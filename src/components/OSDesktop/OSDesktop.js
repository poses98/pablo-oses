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
    const project = async () => {
      const projects = await getFolders();
      const adaptedProjects = await adaptRoot(projects);
      setRoot(adaptedProjects);
    };
    project();
  }, []);
  useEffect(() => {
    console.log('projects', root);
    console.log('folders length', root.length);
  }, [root]);
  return (
    <div className={styles.container}>
      {root.length > 0 &&
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
