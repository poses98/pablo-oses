import { useEffect, useState } from 'react';
import styles from './taskbar.module.css';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function TaskBar() {
  const [hourSet, setHourSet] = useState(false);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setHour(String(date.getHours()).padStart(2, '0'));
      setMinutes(String(date.getMinutes()).padStart(2, '0'));
      setSeconds(String(date.getSeconds()).padStart(2, '0'));
      setHourSet(true);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.homeButton}>
        <p>P</p>
      </div>
      <div className={styles.taskBarIcons}>
        {hourSet && (
          <p
            className={robotoMono.className}
          >{`${hour}:${minutes}:${seconds}`}</p>
        )}
      </div>
    </div>
  );
}
