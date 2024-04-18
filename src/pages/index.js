import { useState } from 'react';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';
import { tree } from '@/resources/tree';
import { useWindowsContext } from '@/providers/WindowsProvider';

export default function Home() {
  const { windows, spawnWindow, handleWindowClose } = useWindowsContext();

  return (
    <>
      <BasicLayout>
        {windows.map((window, index) => (
          <OSWindow
            key={window.id}
            name={window.name}
            type={window.type}
            route={window.route ? window.route : null}
            content={window.content}
            id={window.id}
            handleClose={() => handleWindowClose(window.id)}
          />
        ))}
        <OSDesktop icons={tree} onIconClick={spawnWindow} />
      </BasicLayout>
    </>
  );
}
