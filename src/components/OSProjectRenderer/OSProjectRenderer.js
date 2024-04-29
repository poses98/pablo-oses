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
  return (
    <div
      style={{
        backgroundColor: style?.backgroundColor || '#fff',
        height: '100%',
        padding: '30px',
        overflow: 'scroll',
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
