import { useState } from 'react';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';
import { useWindowsContext } from '@/providers/WindowsProvider';

export default function Home() {
  const { windows, handleWindowClose } = useWindowsContext();

  return (
    <>
      <BasicLayout>
        {windows.map((window) => (
          <OSWindow
            key={window.id}
            name={window.name}
            type={window.type}
            route={window.route ? window.route : null}
            content={window.content}
            id={window.id}
            customWindow={window}
            handleClose={() => handleWindowClose(window.id)}
          />
        ))}
        <OSDesktop />
      </BasicLayout>
    </>
  );
}
