import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { I18nProvider } from '../locales';
import { ThemeProvider } from '../components/ThemeProvider';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Arindam Betal — Senior Frontend Developer',
  description: 'Senior Frontend Developer with 7 years of enterprise experience building scalable, high-performance web and mobile applications. Expert in React, Next.js, Angular, TypeScript.',
  keywords: ['Arindam Betal', 'Frontend Developer', 'React', 'TypeScript', 'Next.js', 'Angular', 'Kolkata'],
  authors: [{ name: 'Arindam Betal' }],
  metadataBase: new URL('https://arindambetal.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Arindam Betal — Senior Frontend Developer',
    description: 'Senior Frontend Developer with 7 years of enterprise experience. Expert in React, Next.js, Angular, TypeScript.',
    url: 'https://arindambetal.dev',
    siteName: 'Arindam Betal Portfolio',
    type: 'website',
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 800,
        alt: 'Arindam Betal Profile Picture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arindam Betal — Senior Frontend Developer',
    description: 'Senior Frontend Developer with 7 years of enterprise experience. Expert in React, Next.js, Angular, TypeScript.',
    images: ['/profile.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
