import TaskBar from '@/components/TaskBar/TaskBar';
import styles from './basiclayout.module.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function BasicLayout({ children }) {
  const [innerHeight, setInnerHeight] = useState('100vh');
  useEffect(() => {
    setInnerHeight(`${window.innerHeight}px`);
    console.log(innerHeight);
  }, []);
  return (
    <div
      className={`${styles.container} ${inter.className}`}
      style={{ height: innerHeight }}
    >
      <div className={styles.backgroundLettering}>
        <h1>Pablo Osés Andía</h1>
        <h2>Full-Stack developer</h2>
      </div>
      {children}

      <TaskBar />
    </div>
  );
}
