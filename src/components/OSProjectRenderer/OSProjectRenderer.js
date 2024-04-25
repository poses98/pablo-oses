import OSMarkdown from '../OSMarkdown/OSMarkdown';
import styles from './osprojectrenderer.module.css';

export default function OSProjectRenderer({ route }) {
  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        height: '100%',
        padding: '30px',
        overflow: 'scroll',
      }}
    >
      <div className={styles.container}>
        <OSMarkdown route={route} />
      </div>
    </div>
  );
}
