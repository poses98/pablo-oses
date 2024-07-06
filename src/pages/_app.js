import '@/styles/globals.css';
import { WindowsProvider } from '@/providers/WindowsProvider';
import { GoogleTagManager } from '@next/third-parties/google';

export default function App({ Component, pageProps }) {
  return (
    <WindowsProvider>
      <GoogleTagManager gtmId="G-40TDHEKVV5" />

      <Component {...pageProps} />
    </WindowsProvider>
  );
}
