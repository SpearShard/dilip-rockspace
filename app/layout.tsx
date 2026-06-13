import type { Metadata } from 'next';
import { Fraunces, DM_Sans, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
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
  title: 'ROCKSPACE — collision, not a company',
  description: 'Three people. Three disciplines. One crash. Design, code, systems — from Bengaluru.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.className} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
