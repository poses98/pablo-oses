import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';

export default function OSDesktop() {
  const iconPlaceholder = [
    { name: 'Terminal', icon: '/img/icons/terminal.svg' },
    { name: 'WhoAmI', icon: '/img/icons/text.svg' },
    { name: 'Personal Projects', icon: '/img/icons/folder.svg' },
    { name: 'Client Projects', icon: '/img/icons/folder.svg' },
  ];
  return (
    <div className={styles.container}>
      {iconPlaceholder.map((element, index) => {
        return <OSIcon key={index} name={element.name} icon={element.icon} />;
      })}
    </div>
  );
}
