import TaskBar from '@/components/TaskBar/TaskBar';
import Head from 'next/head';
import styles from './basiclayout.module.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function BasicLayout({ children }) {
  const [innerHeight, setInnerHeight] = useState('100vh');

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(`${window.innerHeight}px`);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>Pablo Osés - Portfolio</title>
      </Head>
      <main
        className={`${styles.container} ${inter.className}`}
        style={{ height: innerHeight }}
      >
        <div className={styles.backgroundLettering}>
          <h1>Pablo Osés Andía</h1>
          <h2>Full-Stack developer</h2>
        </div>
        {children}

        <TaskBar />
      </main>
    </>
  );
}
