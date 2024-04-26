import styles from './sectionheader.module.css';

export default function SectionHeader({ text }) {
  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
}
