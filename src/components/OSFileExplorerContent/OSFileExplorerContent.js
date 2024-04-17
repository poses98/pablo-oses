import OSIcon from '../OSIcon/OSIcon';
import styles from './osfileexplorercontent.module.css';

export default function OSFileExplorerContent() {
  /**Must be taken from an API call, this is a workaround */
  const iconList = [
    { name: 'ElPolloPaulino', icon: '/img/icons/paulino.png' },
    { name: 'CISNA - Smarthome', icon: '/img/icons/cisna.png' },
    { name: 'TropycalCBD', icon: '/img/icons/tropycal.png' },
  ];
  return (
    <div className={styles.container}>
      {iconList.map((e, index) => {
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
