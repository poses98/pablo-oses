import styles from './osfileexplorerindex.module.css';
import { tree } from '@/resources/tree';

const RenderTree = ({ node, level = 0 }) => {
  const indent = 20;

  if (node.type === 'folder') {
    return (
      <div style={{ paddingLeft: `${level * indent}px` }}>
        <p>{node.name}</p>
        <ul>
          {node.content.map((item, index) => (
            <li key={index}>
              <RenderTree node={item} level={level + 1} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (node.type === 'text') {
    return <p style={{ paddingLeft: `${level * indent}px` }}>{node.name}</p>;
  } else {
    return (
      <div style={{ paddingLeft: `${level * indent}px` }}>
        <p>{node.name}</p>
      </div>
    );
  }
};

export default function OSFileExplorerIndex() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {tree.map((node, index) => (
          <RenderTree key={index} node={node} />
        ))}
      </div>
    </div>
  );
}
