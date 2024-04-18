import Image from 'next/image';
import styles from './windowtaskbar.module.css';
import { useEffect, useState } from 'react';
import { iconProvider } from '@/utils/iconProvider';

export default function WindowTaskbar({ name, type, handleClose }) {
  const [windowIcon, setWindowIcon] = useState('');
  useEffect(() => {
    setWindowIcon(iconProvider(type));
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.windowHeader}>
        <Image width={17} height={17} src={windowIcon} alt={'icon'} />
        <p className={styles.windowTitle}>{name}</p>
      </div>
      <div className={styles.windowActions}>
        <div className={styles.windowButton} onClick={handleClose}>
          <Image
            width={17}
            height={17}
            src={'/img/icons/close.svg'}
            alt={'X'}
          />
        </div>
      </div>
    </div>
  );
}
