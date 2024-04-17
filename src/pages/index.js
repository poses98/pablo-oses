import { useState } from 'react';

import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';

export default function Home() {
  const [windows, setWindows] = useState([]);

  const iconPlaceholder = [
    { name: 'Terminal', icon: '/img/icons/terminal.svg' },
    { name: 'WhoAmI', icon: '/img/icons/text.svg' },
    { name: 'Personal Projects', icon: '/img/icons/folder.svg' },
    { name: 'Client Projects', icon: '/img/icons/folder.svg' },
  ];

  return (
    <BasicLayout>
      <OSDesktop icons={iconPlaceholder} />
    </BasicLayout>
  );
}
