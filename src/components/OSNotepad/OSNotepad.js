import OSMarkdown from '../OSMarkdown/OSMarkdown';
import styles from './osnotepad.module.css';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function OSNotepad({ content }) {
  return (
    <div className={`${styles.container} ${robotoMono.className}`}>
      <OSMarkdown content={content} />
      <button className={styles.contactButton}>Contact Me</button>
    </div>
  );
}
