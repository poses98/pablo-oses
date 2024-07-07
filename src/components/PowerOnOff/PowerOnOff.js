import { useState } from 'react';
import styles from './poweronoff.module.css';

export default function PowerOnOff({ handleClick }) {
  const [screenTouched, setScreenTouched] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`${styles.container} ${loaded ? styles.powerOnAnimation : ''}`}
      onClick={() => {
        setScreenTouched(true);
        setTimeout(() => {
          setLoaded(true);
          setTimeout(() => {
            handleClick();
          }, 2000);
        }, 2000);
      }}
    >
      {!screenTouched && (
        <>
          <h1 className={styles.vintageText}>Greetings, esteemed visitor!</h1>
          <h2 className={`${styles.flickerText} ${styles.vintageText}`}>
            Click the screen to commence
          </h2>
        </>
      )}

      {screenTouched && (
        <div className={styles.loading}>
          <h2 className={`${styles.loadingText} ${styles.vintageText}`}>
            {loaded ? 'Loading accomplished.' : 'Loading...'}
          </h2>
          <div className={styles.loadingBox}>
            <div className={styles.loadingBar} />
          </div>
        </div>
      )}
    </div>
  );
}
