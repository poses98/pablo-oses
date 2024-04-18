import { useState, useEffect } from 'react';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';
import { tree } from '@/resources/tree';

export default function Home() {
  const [windows, setWindows] = useState([]);
  const [personalProjects, setPersonalProjects] = useState(null);
  const [clientProjects, setClientProjects] = useState(null);
  const [misc, setMisc] = useState(null);

  console.log(tree);

  useEffect(() => {}, []);

  const spawnWindow = (node) => {
    const windowContent = {
      name: node.name,
      type: node.type,
      route: node.route,
      content: node.content,
    };
    if (windows.length < 8) {
      setWindows([...windows, { id: windows.length, ...windowContent }]);
      console.log({ id: windows.length, ...windowContent });
    } else {
      alert('Max window number');
    }
  };

  const handleWindowClose = (id) => {
    setWindows(windows.filter((window, index) => index !== id));
  };

  return (
    <BasicLayout>
      {windows.map((window, index) => (
        <OSWindow
          key={index}
          name={window.name}
          type={window.type}
          route={window.route ? window.route : null}
          content={window.content}
          handleClose={() => handleWindowClose(window.id)}
        />
      ))}
      <OSDesktop icons={tree} onIconClick={spawnWindow} />
    </BasicLayout>
  );
}
