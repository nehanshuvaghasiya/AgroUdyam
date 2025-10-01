import { Providers } from '@/components/providers/Providers';
import '@/app/globals.css';

export const metadata = {
  title: 'AgroUdyam - Fresh Produce from Farm to Table',
  description: 'Connect directly with local farmers and get fresh, organic produce delivered to your doorstep.',
  keywords: 'fresh produce, organic food, local farmers, farm to table, agriculture',
  authors: [{ name: 'AgroUdyam Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AgroUdyam - Fresh Produce from Farm to Table',
    description: 'Connect directly with local farmers and get fresh, organic produce delivered to your doorstep.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AgroUdyam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroUdyam - Fresh Produce from Farm to Table',
    description: 'Connect directly with local farmers and get fresh, organic produce delivered to your doorstep.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#52c41a" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}