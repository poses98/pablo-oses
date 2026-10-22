import styles from './projectparagraph.module.css';

const BULLET = /^\s*[•\-]\s*/;

const toHtml = (text) => text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

// Content uses "• item<br/>• item" for lists. Turn consecutive bullet lines
// into a real list and keep the rest as paragraphs.
function toBlocks(text) {
  const blocks = [];
  text.split(/<br\s*\/?>/i).forEach((raw) => {
    const line = raw.trim();
    if (!line) return;
    if (BULLET.test(line)) {
      const item = line.replace(BULLET, '');
      const last = blocks[blocks.length - 1];
      if (last?.type === 'list') last.items.push(item);
      else blocks.push({ type: 'list', items: [item] });
    } else {
      blocks.push({ type: 'text', text: line });
    }
  });
  return blocks;
}

export default function ProjectParagraph({ text, lead = false }) {
  return (
    <div className={`${styles.container} ${lead ? styles.lead : ''}`}>
      {toBlocks(text).map((block, index) =>
        block.type === 'list' ? (
          <ul key={index} className={styles.list}>
            {block.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: toHtml(item) }} />
            ))}
          </ul>
        ) : (
          <p key={index} dangerouslySetInnerHTML={{ __html: toHtml(block.text) }} />
        )
      )}
    </div>
  );
}
