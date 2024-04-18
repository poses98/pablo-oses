import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './osicon.module.css';
import { iconProvider } from '@/utils/iconProvider';

export default function OSIcon({ name, icon, type, onClick, nameStyles }) {
  const [defaultIcon, setDefaultIcon] = useState(null);
  const iconSize = 70;

  useEffect(() => {
    if (!icon) {
      setDefaultIcon(iconProvider(type));
    } else {
      setDefaultIcon(icon);
    }
  }, [type, icon]);

  return (
    <div className={styles.container} onClick={onClick}>
      {defaultIcon && (
        <Image
          src={defaultIcon}
          alt={`${name} icon`}
          width={iconSize}
          height={iconSize}
        />
      )}

      <p className={`${styles.iconName}`} style={nameStyles}>
        {name}
      </p>
    </div>
  );
}
