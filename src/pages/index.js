import React, { useState } from 'react';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';
import { useWindowsContext } from '@/providers/WindowsProvider';
import PowerOnOff from '@/components/PowerOnOff/PowerOnOff';

export default function Home() {
  const { windows, handleWindowClose } = useWindowsContext();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  return (
    <>
      {animationPlayed && (
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
      )}

      <PowerOnOff handleClick={() => setAnimationPlayed(true)} />
    </>
  );
}
