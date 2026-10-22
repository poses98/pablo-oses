import StackCard from '../StackCard/StackCard';
import styles from './techstack.module.css';

export default function TechStack({ stack }) {
  return (
    <section className={styles.container} aria-label="Technologies used">
      <p className={styles.label}>Tech stack</p>
      <div className={styles.grid}>
        {stack.map((tech, index) => (
          <StackCard key={index} tech={tech.tech} text={tech.text} />
        ))}
      </div>
    </section>
  );
}
