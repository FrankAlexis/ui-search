'use client';
import { StateProvider } from '@/infra/hooks/state-context';
import BackToTopButton from '@/interface/components/back-to-top';
import SnackBar from '@/interface/components/snack-bar';
import Image from 'next/image';
import './globals.css';
import Header from '@/interface/components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='' suppressHydrationWarning>
        <div className='grid min-h-screen items-center justify-items-center gap-2'>
          <StateProvider>
            <Header />
            <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
              <div className='min-h-screen p-4'>{children}</div>
              <BackToTopButton />
              <SnackBar />
            </main>
          </StateProvider>
          <footer className='text-gray row-start-3 flex w-full flex-wrap items-center justify-center gap-6 border-cyan-100 bg-black p-4 text-white'>
            <a
              className='flex items-center gap-2 hover:underline hover:underline-offset-4'
              href='https://github.com/FrankAlexis/ui-search'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                aria-hidden
                src='/file.svg'
                alt='File icon'
                width={16}
                height={16}
              />
              GitHub Source code
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
