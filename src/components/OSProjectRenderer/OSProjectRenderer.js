import { useEffect } from 'react';
import styles from './osprojectrenderer.module.css';
import ImageShowcase from './ImageShowcase/ImageShowcase';
import ProjectHeader from './ProjectHeader/ProjectHeader';
import ProjectParagraph from './ProjectParagraph/ProjectParagraph';
import SectionHeader from './SectionHeader/SectionHeader';
import StackCard from './StackCard/StackCard';
import SubsectionHeader from './SubsectionHeader/SubsectionHeader';

const components = {
  ProjectHeader,
  SectionHeader,
  Paragraph: ProjectParagraph,
  ImageShowcase,
  StackCard,
  SubsectionHeader,
};

export default function OSProjectRenderer({ contentTree, style }) {
  return (
    <div
      style={{
        backgroundColor: style?.backgroundColor || '#fff',
        height: '100%',
        padding: '30px',
        overflow: 'scroll',
        color,
      }}
    >
      <div className={styles.container}>
        {contentTree.map((item, index) => {
          const Component = components[item.type];
          return <Component key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
