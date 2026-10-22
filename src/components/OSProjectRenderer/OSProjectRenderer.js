import { useMemo, useRef, useState } from 'react';
import styles from './osprojectrenderer.module.css';
import ImageShowcase from './ImageShowcase/ImageShowcase';
import ProjectHeader from './ProjectHeader/ProjectHeader';
import ProjectParagraph from './ProjectParagraph/ProjectParagraph';
import SectionHeader from './SectionHeader/SectionHeader';
import SubsectionHeader from './SubsectionHeader/SubsectionHeader';
import TechStack from './TechStack/TechStack';
import ActionButton from './ActionButton/ActionButton';
import ProjectFacts from './ProjectFacts/ProjectFacts';

const components = {
  SectionHeader,
  Paragraph: ProjectParagraph,
  TechStack,
  ProjectImages: ImageShowcase,
  SubsectionHeader,
  Link: ActionButton,
};

const slugify = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function OSProjectRenderer({ contentTree, style, activeTab }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // The header becomes the hero; the rest is the article. Section headers get
  // stable ids so the table of contents can jump to them.
  const { header, blocks, sections } = useMemo(() => {
    const header = contentTree.find((item) => item.type === 'ProjectHeader');
    const sections = [];
    let leadAssigned = false;
    const blocks = contentTree
      .filter((item) => item !== header)
      .map((item, index) => {
        if (item.type === 'SectionHeader') {
          const id = `${slugify(item.text)}-${index}`;
          sections.push({ id, text: item.text });
          return { ...item, id };
        }
        // The first paragraph is the project summary: give it more weight.
        if (item.type === 'Paragraph' && !leadAssigned) {
          leadAssigned = true;
          return { ...item, lead: true };
        }
        return item;
      });
    return { header, blocks, sections };
  }, [contentTree]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  const jumpTo = (id) => {
    const target = scrollRef.current?.querySelector(`#${CSS.escape(id)}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={scrollRef}
      className={styles.scroller}
      style={style?.backgroundColor ? { backgroundColor: style.backgroundColor } : undefined}
      onScroll={handleScroll}
    >
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} />

      {header && <ProjectHeader {...header} />}

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <ProjectFacts
            date={header?.date || activeTab?.date}
            techStack={activeTab?.techStack}
            deployment={activeTab?.deployment}
            url={activeTab?.url}
          />
          {sections.length > 1 && (
            <nav className={styles.toc} aria-label="On this page">
              <p className={styles.asideTitle}>On this page</p>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <button type="button" onClick={() => jumpTo(section.id)}>
                      {section.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>

        <article className={styles.article}>
          {blocks.map((item, index) => {
            const Component = components[item.type];
            return Component ? <Component key={index} {...item} /> : null;
          })}
        </article>
      </div>
    </div>
  );
}
