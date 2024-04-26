import styles from './projectparagraph.module.css';

export default function ProjectParagraph({ text }) {
  const htmlText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  return (
    <div className={styles.container}>
      <p dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}
