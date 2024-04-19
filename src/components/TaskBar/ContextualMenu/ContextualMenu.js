import Image from 'next/image';
import styles from './contextualmenu.module.css';

export default function ContextualMenu() {
  return (
    <div className={styles.container}>
      <div className={styles.menuItem}>
        <Image
          src={'/img/icons/linkedin.svg'}
          width={30}
          height={30}
          alt="linkedin icon"
        />
        <p>Texto</p>
      </div>
    </div>
  );
}
