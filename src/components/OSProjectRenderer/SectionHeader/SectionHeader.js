import styles from './sectionheader.module.css';

export default function SectionHeader({ text, id }) {
  return (
    <h2 id={id} className={styles.sectionHeader}>
      {text}
    </h2>
  );
}
