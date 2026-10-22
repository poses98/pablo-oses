import Image from 'next/image';
import styles from './imageshowcase.module.css';

export default function ImageShowcase({ images }) {
  return (
    <section className={styles.container} aria-label="Screenshots">
      <p className={styles.label}>Screenshots</p>
      <div className={styles.track}>
        {images.map((image, index) => (
          <figure key={index} className={styles.shot}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(max-width: 480px) 60vw, 220px"
              className={styles.image}
            />
            {image.alt && <figcaption>{image.alt}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
