import StackCard from '../StackCard/StackCard';
import styles from './techstack.module.css';

export default function TechStack({ stack }) {
  return (
    <div className={styles.container}>
      {stack.map((tech, index) => {
        return <StackCard key={index} tech={tech.tech} text={tech.text} />;
      })}
    </div>
  );
}
