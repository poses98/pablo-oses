import TaskBar from '@/components/TaskBar/TaskBar';
import Head from 'next/head';
import styles from './basiclayout.module.css';
import { Inter } from 'next/font/google';
import { useRef, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function BasicLayout({ children }) {
  const [innerHeight, setInnerHeight] = useState('100vh');

  const taskbarRef = useRef(null);
  const licenseRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(`${window.innerHeight}px`);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (taskbarRef.current) {
      const taskbarHeight = taskbarRef.current.offsetHeight;
      console.log(taskbarHeight);
    }
  }, [taskbarRef]);
  useEffect(() => {
    if (licenseRef.current) {
      const licenseWidth = licenseRef.current.offsetWidth;
      console.log(licenseWidth);
    }
  }, [licenseRef]);

  return (
    <>
      <Head>
        <title>Pablo Osés - Portfolio</title>
        <meta property="og:image" content={'/og_image.jpg'} />
        <meta name="og:title" content="Pablo Oses - Portfolio" />
        <meta
          name="description"
          content="Welcome to Pablo Oses' portfolio, I am a dedicated Full Stack Developer with a passion for problem-solving and software development. Explore an interactive OS-desktop-like interface showcasing a collection of diverse development projects built by Pablo Oses, each demonstrating a unique blend of creativity and functionality. Dive in to discover the depth of my coding skills and my commitment to efficient, effective design."
        />
      </Head>
      <main
        className={`${styles.container} ${inter.className}`}
        style={{ height: innerHeight }}
      >
        <div className={styles.backgroundLettering}>
          <h1>Pablo Osés Andía</h1>
          <h2>Full-Stack Developer</h2>
        </div>

        <div
          className={styles.backgroundLicense}
          style={{
            bottom: `${taskbarRef?.current?.offsetHeight + 10}px`,
            left: `calc(100% - ${licenseRef?.current?.offsetWidth + 25}px)`,
          }}
        >
          <p>Activate Windows?</p>
          <p ref={licenseRef}>Go Ahead and Change to Linux 🐧😜</p>
        </div>

        {children}

        <TaskBar ref={taskbarRef} />
      </main>
    </>
  );
}
