import Image from 'next/image';
import styles from './windowtaskbar.module.css';
import { useEffect, useState } from 'react';

export default function WindowTaskbar({ name, type, handleClose }) {
  const [windowIcon, setWindowIcon] = useState('/img/icons/close.svg');
  useEffect(() => {
    switch (type) {
      case 'folder':
        setWindowIcon('/img/icons/folder.svg');
        break;
      case 'terminal':
        setWindowIcon('/img/icons/terminal_white.svg');
        break;
      case 'text':
        setWindowIcon('/img/icons/text.svg');
        break;
      default:
        setWindowIcon('/img/icons/close.svg');
        break;
    }
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
