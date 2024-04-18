import { useState } from 'react';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';
import { tree } from '@/resources/tree';
import { useWindows } from '@/hooks/useWindows';

export default function Home() {
  const { windows, spawnWindow, handleWindowClose } = useWindows();

  return (
    <>
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
    </>
  );
}
