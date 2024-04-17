import TaskBar from '@/components/TaskBar/TaskBar';
import styles from './basiclayout.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function BasicLayout({ children }) {
  return (
    <div className={`${styles.container} ${inter.className}`}>
      {children}
      <TaskBar />
    </div>
  );
}
