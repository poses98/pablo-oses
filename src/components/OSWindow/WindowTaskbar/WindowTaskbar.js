import Image from 'next/image';
import styles from './windowtaskbar.module.css';
import { useEffect, useState } from 'react';
import { iconProvider } from '@/utils/iconProvider';
import { useWindowsContext } from '@/providers/WindowsProvider';
import { FaWindowMinimize, FaWindowMaximize } from 'react-icons/fa';

export default function WindowTaskbar({ name, type, handleClose, id }) {
  const { handleWindowMinimize, handleWindowMaximize } = useWindowsContext();
  const [windowIcon, setWindowIcon] = useState(null);

  useEffect(() => {
    setWindowIcon(iconProvider(type));
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.windowHeader}>
        {windowIcon && (
          <Image width={17} height={17} src={windowIcon} alt={'icon'} />
        )}
        <p className={styles.windowTitle}>{name}</p>
      </div>

      <div className={styles.windowActions}>
        <div
          className={styles.windowButton}
          onClick={() => handleWindowMinimize(id)}
        >
          <FaWindowMinimize width={17} height={17} />
        </div>
        <div
          className={styles.windowButton}
          onClick={() => handleWindowMaximize(id)}
        >
          <FaWindowMaximize width={17} height={17} />
        </div>
        <div className={styles.windowCloseButton} onClick={handleClose}>
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
