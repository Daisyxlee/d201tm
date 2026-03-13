import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SessionProvider } from '@/components/SessionProvider';

export const metadata: Metadata = {
  title: 'District 201 Toastmasters | Where Leaders Are Made',
  description:
    'District 201 Toastmasters International - We build new clubs and support all clubs in achieving excellence. Find a club near you.',
  metadataBase: new URL('https://d201tm.org'),
  openGraph: {
    title: 'District 201 Toastmasters',
    description: 'We build new clubs and support all clubs in achieving excellence.',
    url: 'https://d201tm.org',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-tm-cream text-tm-charcoal antialiased">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
