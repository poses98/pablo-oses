import TaskBar from '@/components/TaskBar/TaskBar';
import styles from './basiclayout.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function BasicLayout({ children }) {
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <div className={styles.backgroundLettering}>
        <h1>Pablo Osés Andía</h1>
        <h2>Full-Stack developer</h2>
      </div>
      {children}

      <TaskBar />
    </div>
  );
}
