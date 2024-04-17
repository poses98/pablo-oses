import Image from 'next/image';
import styles from './osicon.module.css';

export default function OSIcon({ name, icon, onClick, nameStyles }) {
  const iconSize = 70;
  return (
    <div className={styles.container} onClick={onClick}>
      <Image
        src={icon}
        alt={`${name} icon`}
        width={iconSize}
        height={iconSize}
      />
      <p className={`${styles.iconName}`} style={nameStyles}>
        {name}
      </p>
    </div>
  );
}
