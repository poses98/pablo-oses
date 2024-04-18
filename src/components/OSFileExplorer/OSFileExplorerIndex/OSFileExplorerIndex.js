import Image from 'next/image';
import styles from './osfileexplorerindex.module.css';
import { tree } from '@/resources/tree';
import { iconProvider } from '@/utils/iconProvider';
import { useWindowsContext } from '@/providers/WindowsProvider';

const RenderTree = ({ node, level = 0, route }) => {
  const { handleWindowContentChange } = useWindowsContext();
  const indent = 20;

  if (node.type === 'folder') {
    let sameRoute = route === node.route;
    return (
      <div
        className={styles.indexItemContainer}
        style={{ paddingLeft: `${level * indent}px` }}
      >
        <div
          onClick={() => handleWindowContentChange(node)}
          className={`${styles.indexItem} ${
            sameRoute ? styles.sameRoute : styles.indexItem
          }`}
        >
          <Image
            width={15}
            height={15}
            src={iconProvider(node.type)}
            alt="X"
            style={{ marginRight: '5px' }}
          />
          <p>{node.name}</p>
        </div>
        <ul>
          {node.content.map((item, index) => (
            <li key={index}>
              <RenderTree node={item} level={level + 1} />
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (
    node.type === 'text' ||
    node.type === 'contact' ||
    node.type === 'pdf'
  ) {
    return (
      <div style={{ paddingLeft: `${level * indent}px` }}>
        <div className={styles.indexItem}>
          <Image
            width={15}
            height={15}
            src={iconProvider(node.type)}
            alt="X"
            style={{ marginRight: '5px' }}
          />
          <p>{node.name}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ paddingLeft: `${level * indent}px` }}>
        <div className={styles.indexItem}>
          <Image
            width={15}
            height={15}
            src={node.icon}
            alt="X"
            style={{ marginRight: '5px' }}
          />
          <p>{node.name}</p>
        </div>
      </div>
    );
  }
};

export default function OSFileExplorerIndex({ route }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {tree.map((node, index) => (
          <RenderTree key={index} node={node} route={route} />
        ))}
      </div>
    </div>
  );
}
