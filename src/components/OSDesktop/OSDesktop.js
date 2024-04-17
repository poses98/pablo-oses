import OSIcon from '../OSIcon/OSIcon';
import styles from './osdesktop.module.css';

export default function OSDesktop({ icons, onIconClick }) {
  return (
    <div className={styles.container}>
      {icons.map((element, index) => {
        return (
          <OSIcon
            key={index}
            name={element.name}
            icon={element.icon}
            onClick={() =>
              onIconClick(element.name, element.type, element.route)
            }
          />
        );
      })}
    </div>
  );
}
