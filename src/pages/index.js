import { useState, useEffect } from 'react';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';

export default function Home() {
  const [windows, setWindows] = useState([]);
  const [personalProjects, setPersonalProjects] = useState(null);
  const [clientProjects, setClientProjects] = useState(null);
  const [misc, setMisc] = useState(null);

  useEffect(() => {
    try {
      fetch('/api/personal-projects')
        .then((res) => res.json())
        .then((personalProjects) => {
          setPersonalProjects(JSON.stringify(personalProjects));
          console.log(personalProjects);
        });
      fetch('/api/client-projects')
        .then((res) => res.json())
        .then((clientProjects) => {
          setClientProjects(clientProjects);
        });
      fetch('/api/misc')
        .then((res) => res.json())
        .then((misc) => {
          setMisc(JSON.stringify(misc));
        });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const nodePlaceholder = [
    { name: 'Terminal', type: 'terminal', icon: '/img/icons/terminal.svg' },
    { name: 'WhoAmI', type: 'text', icon: '/img/icons/text.svg' },
    {
      name: 'Personal Projects',
      type: 'folder',
      icon: '/img/icons/folder.svg',
      route: '/personal-projects',
    },
    {
      name: 'Client Projects',
      type: 'folder',
      icon: '/img/icons/folder.svg',
      route: '/client-projects',
    },
  ];

  const spawnWindow = (name, type, route = null) => {
    if (windows.length < 8) {
      setWindows([...windows, { id: windows.length, name, type, route }]);
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
          handleClose={() => handleWindowClose(window.id)}
        />
      ))}
      <OSDesktop icons={nodePlaceholder} onIconClick={spawnWindow} />
    </BasicLayout>
  );
}
