import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OSDesktop from '@/components/OSDesktop/OSDesktop';
import BasicLayout from '@/layouts/BasicLayout';
import OSWindow from '@/components/OSWindow/OSWindow';
import { useWindowsContext } from '@/providers/WindowsProvider';
import PowerOnOff from '@/components/PowerOnOff/PowerOnOff';
import { findNodeBySlug } from '@/utils/treeNav';
import { getTree } from '../../sanity/sanity-utils';

export default function Home() {
  const { windows, handleWindowClose, tree, spawnWindow } = useWindowsContext();
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [deepLinkHandled, setDeepLinkHandled] = useState(false);
  const router = useRouter();

  // Enlace profundo: si la URL trae ?open=<slug>, abre ese proyecto/CV/página
  // una sola vez tras encender el escritorio. Así un enlace compartido lleva
  // directamente al contenido enlazado.
  useEffect(() => {
    if (!animationPlayed || deepLinkHandled || !router.isReady) return;
    const raw = router.query.open;
    const slug = Array.isArray(raw) ? raw[0] : raw;
    if (slug) {
      const node = findNodeBySlug(tree, slug);
      if (node) spawnWindow(node);
    }
    setDeepLinkHandled(true);
  }, [
    animationPlayed,
    deepLinkHandled,
    router.isReady,
    router.query.open,
    tree,
    spawnWindow,
  ]);

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
      {!animationPlayed && (
        <PowerOnOff handleClick={() => setAnimationPlayed(true)} />
      )}
    </>
  );
}

// Carga el árbol de contenido desde Sanity en tiempo de build (ISR). Si Sanity
// está vacío (antes de migrar) o falla, se devuelve un array vacío y la UI cae
// al fallback estático src/resources/tree.js a través de WindowsProvider.
export async function getStaticProps() {
  let tree = [];
  try {
    tree = await getTree();
  } catch (error) {
    console.error('getTree() failed, using static tree fallback:', error);
    tree = [];
  }
  return {
    props: { tree },
    // Revalidación incremental: la home se regenera como máximo cada 60s para
    // reflejar cambios publicados en el CMS sin necesidad de redeploy.
    revalidate: 60,
  };
}
