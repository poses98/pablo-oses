import Image from 'next/image';
import styles from './projectheader.module.css';

// "Couplat - Digital Vouchers for Restaurants" -> title + tagline.
function splitTitle(text = '') {
  const [title, ...rest] = text.split(' - ');
  return { title, tagline: rest.join(' - ') };
}

export default function ProjectHeader({ text, logo, date }) {
  const { title, tagline } = splitTitle(text);

  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <Image
          src={logo}
          width={88}
          height={88}
          alt={`${title} logo`}
          className={styles.logo}
          priority
        />
        <div className={styles.text}>
          {date && <p className={styles.date}>{date}</p>}
          <h1 className={styles.title}>{title}</h1>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>
      </div>
    </header>
  );
}
