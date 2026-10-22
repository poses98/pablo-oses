import styles from './subsectionheader.module.css';

export default function SubsectionHeader({ text }) {
  return <h3 className={styles.subsectionHeader}>{text}</h3>;
}
