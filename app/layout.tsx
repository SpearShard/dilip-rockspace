import type { Metadata } from 'next';
import { Geist, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hand',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ROCKSPACE — Creative Technology Studio',
  description: 'Brand identity, UI/UX, development, AI automation & content. Based in Bengaluru.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
