import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'RockSpace | Premium digital experiences',
  description: 'Brand systems, product design, web experiences, and AI workflows crafted with calm precision.',
  icons: [{ rel: 'icon', url: '/favicon.png' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${inter.className}`}>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
