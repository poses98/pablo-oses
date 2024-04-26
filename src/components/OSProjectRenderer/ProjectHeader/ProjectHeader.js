import Image from 'next/image';
import styles from './projectheader.module.css';

export default function ProjectHeader({ text, logo, date }) {
  return (
    <div className={styles.container}>
      <Image src={logo} width={100} height={100} alt={`${text} logo`} />
      <h2>{text}</h2>
      <p>{date}</p>
    </div>
  );
}
