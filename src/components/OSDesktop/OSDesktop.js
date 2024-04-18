import { useState, useEffect } from 'react';
import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';

export default function OSDesktop({ icons, onIconClick }) {
  const [tree, setTree] = useState([]);
  useEffect(() => {
    setTree(icons);
  }, [icons]);

  return (
    <div className={styles.container}>
      {tree.map((element, index) => {
        return (
          <OSIcon
            key={index}
            name={element.name}
            type={element.type}
            onClick={() => onIconClick(element)}
          />
        );
      })}
    </div>
  );
}
