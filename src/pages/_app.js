import '@/styles/globals.css';
import { WindowsProvider } from '@/providers/WindowsProvider';

export default function App({ Component, pageProps }) {
  return (
    <WindowsProvider>
      <Component {...pageProps} />
    </WindowsProvider>
  );
}
