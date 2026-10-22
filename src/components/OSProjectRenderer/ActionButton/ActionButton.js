import { FiArrowUpRight } from 'react-icons/fi';
import styles from './actionbutton.module.css';

const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export default function ActionButton({ text, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.actionCard}
    >
      <span className={styles.copy}>
        <span className={styles.kicker}>{text || 'See it live'}</span>
        <span className={styles.host}>{hostname(url)}</span>
      </span>
      <span className={styles.arrow} aria-hidden>
        <FiArrowUpRight />
      </span>
    </a>
  );
}
