import Image from 'next/image';
import styles from './stackcard.module.css';
import { iconProvider } from '@/utils/iconProvider';
import ProjectParagraph from '../ProjectParagraph/ProjectParagraph';

export default function StackCard({ tech, text }) {
  return (
    <div className={styles.techCard}>
      <Image
        src={iconProvider(tech)}
        width={75}
        height={75}
        alt={`${tech} icon`}
        className={styles.cardImage}
      />
      <p className={styles.cardTitle}>{tech}</p>
      <ProjectParagraph text={text} />
    </div>
  );
}
