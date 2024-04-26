import Image from 'next/image';
import styles from './imageshowcase.module.css';

export default function ImageShowcase({ images }) {
  return (
    <div className={styles.container}>
      {images.map((image, index) => {
        return (
          <Image
            key={index}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
          />
        );
      })}
    </div>
  );
}
