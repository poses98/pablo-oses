import { useEffect, useState } from 'react';
import styles from './taskbar.module.css';

export default function TaskBar() {
  const date = new Date();
  const [hour, setHour] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setHour(String(date.getHours()).padStart(2, '0'));
      setMinutes(String(date.getMinutes()).padStart(2, '0'));
      setSeconds(String(date.getSeconds()).padStart(2, '0'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.homeButton}>
        <p>P</p>
      </div>
      <div className={styles.taskBarIcons}>
        <p>{`${hour}:${minutes}:${seconds}`}</p>
      </div>
    </div>
  );
}
