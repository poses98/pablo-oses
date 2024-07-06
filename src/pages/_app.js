import '@/styles/globals.css';
import { WindowsProvider } from '@/providers/WindowsProvider';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <WindowsProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-40TDHEKVV5"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-40TDHEKVV5');
        `}
      </Script>

      <Component {...pageProps} />
    </WindowsProvider>
  );
}
