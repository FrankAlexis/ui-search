import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Search restaurant App',
  description:
    'This is a search restaurant app challenge using Algolia search.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='' suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
