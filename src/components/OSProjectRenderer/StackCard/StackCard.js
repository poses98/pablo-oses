import Image from 'next/image';
import styles from './stackcard.module.css';
import { techIcon } from '@/utils/iconProvider';

const toHtml = (text) => text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

export default function StackCard({ tech, text }) {
  const icon = techIcon(tech);

  return (
    <div className={styles.techCard}>
      <div className={styles.cardHead}>
        <span className={styles.iconTile}>
          {icon ? (
            <Image src={icon} width={22} height={22} alt="" />
          ) : (
            <span className={styles.initial}>{tech.charAt(0)}</span>
          )}
        </span>
        <p className={styles.cardTitle}>{tech}</p>
      </div>
      <p
        className={styles.cardText}
        dangerouslySetInnerHTML={{ __html: toHtml(text) }}
      />
    </div>
  );
}
