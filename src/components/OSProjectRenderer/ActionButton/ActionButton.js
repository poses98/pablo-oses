import styles from './actionbutton.module.css';

export default function ActionButton({ text, url }) {
  return (
    <div className={styles.actionButton}>
      <a href={url} className={styles.button}>
        Visit Site
      </a>
    </div>
  );
}
