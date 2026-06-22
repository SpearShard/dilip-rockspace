import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'ROCKSPACE, lets get started',
  description: 'Three people. Three disciplines. One crash. Design, code, systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntu.className}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
