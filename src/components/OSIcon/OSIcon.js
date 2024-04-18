import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './osicon.module.css';
import { iconProvider } from '@/utils/iconProvider';

export default function OSIcon({ name, icon, type, onClick, nameStyles }) {
  const iconSize = 70;
  const [defaultIcon, setDefaultIcon] = useState('');

  useEffect(() => {
    setDefaultIcon(iconProvider(type));
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
