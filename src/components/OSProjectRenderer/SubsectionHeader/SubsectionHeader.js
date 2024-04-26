import styles from './subsectionheader.module.css';

export default function SubsectionHeader({ text }) {
  return (
    <div className={styles.container}>
      <h4>{text}</h4>
    </div>
  );
}
