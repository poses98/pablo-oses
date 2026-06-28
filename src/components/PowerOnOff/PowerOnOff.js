import { useEffect, useRef, useState } from 'react';
import styles from './poweronoff.module.css';

export default function PowerOnOff({ handleClick }) {
  const [loaded, setLoaded] = useState(false);
  const finished = useRef(false);

  // Auto-play a brief, elegant boot then reveal the desktop.
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 1400);
    const t2 = setTimeout(() => finish(), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    handleClick();
  };

  return (
    <div
      className={`${styles.container} ${loaded ? styles.fadeOut : ''}`}
      onClick={() => {
        setLoaded(true);
        setTimeout(finish, 250);
      }}
    >
      <div className={styles.content}>
        <div className={styles.logo}>PO</div>
        <h1 className={styles.name}>Pablo Osés</h1>
        <p className={styles.subtitle}>Software Engineer</p>

        <div className={styles.progressTrack}>
          <div className={styles.progressBar} />
        </div>
      </div>

      <p className={styles.skipHint}>click to skip</p>
    </div>
  );
}
