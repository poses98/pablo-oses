import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './osicon.module.css';

export default function OSIcon({ name, icon, type, onClick, nameStyles }) {
  const iconSize = 70;
  const [defaultIcon, setDefaultIcon] = useState('/img/icons/close.svg');
  useEffect(() => {
    switch (type) {
      case 'folder':
        setDefaultIcon('/img/icons/folder.svg');
        break;
      case 'terminal':
        setDefaultIcon('/img/icons/terminal_white.svg');
        break;
      case 'text':
        setDefaultIcon('/img/icons/text.svg');
        break;
      default:
        setDefaultIcon('/img/icons/close.svg');
        break;
    }
  }, [type]);

  return (
    <div className={styles.container} onClick={onClick}>
      <Image
        src={icon ? icon : defaultIcon}
        alt={`${name} icon`}
        width={iconSize}
        height={iconSize}
      />
      <p className={`${styles.iconName}`} style={nameStyles}>
        {name}
      </p>
    </div>
  );
}
