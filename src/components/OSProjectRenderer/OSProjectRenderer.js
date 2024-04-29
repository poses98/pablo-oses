import { useEffect, useRef } from 'react';
import styles from './osprojectrenderer.module.css';
import { useWindowsContext } from '@/providers/WindowsProvider';
import ImageShowcase from './ImageShowcase/ImageShowcase';
import ProjectHeader from './ProjectHeader/ProjectHeader';
import ProjectParagraph from './ProjectParagraph/ProjectParagraph';
import SectionHeader from './SectionHeader/SectionHeader';
import SubsectionHeader from './SubsectionHeader/SubsectionHeader';
import TechStack from './TechStack/TechStack';
import ActionButton from './ActionButton/ActionButton';

const components = {
  ProjectHeader,
  SectionHeader,
  Paragraph: ProjectParagraph,
  TechStack,
  ProjectImages: ImageShowcase,
  SubsectionHeader,
  Link: ActionButton,
};

export default function OSProjectRenderer({ contentTree, style }) {
  const { windows } = useWindowsContext();

  const projectRendererRef = useRef(null);

  useEffect(() => {
    if (projectRendererRef.current && windows.length > 0)
      projectRendererRef.current.scrollTo(0, 0);
  }, [windows]);

  return (
    <div
      style={{
        backgroundColor: style?.backgroundColor || '#fff',
        height: '100%',
        padding: '30px',
        overflow: 'scroll',
      }}
      ref={projectRendererRef}
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
