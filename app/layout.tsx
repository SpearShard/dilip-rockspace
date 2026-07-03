import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import ScrollProgress from '@/components/micro/ScrollProgress';
import Grain from '@/components/micro/Grain';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
  weight: ['500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['500'],
});

export const metadata: Metadata = {
  title: 'RockSpace | Design, code & systems',
  description: 'Three disciplines. One studio. We build brands and products that win trust.',
  icons: [{ rel: 'icon', url: '/favicon.png' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ScrollProgress />
        <Grain />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
