import OSIcon from '../../OSIcon/OSIcon';
import styles from './osfileexplorercontent.module.css';

export default function OSFileExplorerContent({ content }) {
  return (
    <div className={styles.container}>
      {content.map((e, index) => {
        return (
          <div className={styles.elementContainer} key={index}>
            <OSIcon
              nameStyles={{ marginTop: '5px' }}
              icon={e.icon}
              name={e.name}
              onClick={() => {
                console.log(`clicked ${e.name}`);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
