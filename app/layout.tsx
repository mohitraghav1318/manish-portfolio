import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Anton, Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import Cursor from '@/components/Cursor';
import { site } from '@/data/site';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--font-d', display: 'swap' });
const heavy = Anton({ subsets: ['latin'], weight: '400', variable: '--font-h', display: 'swap' });
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-b', display: 'swap' });

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎬</text></svg>" },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0E0E10' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${heavy.variable} ${body.variable}`}>
      <body>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
