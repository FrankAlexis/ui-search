'use client';
import { StateProvider } from '@/infra/hooks/state-context';
import BackToTopButton from '@/interface/components/back-to-top';
import SearchInput from '@/interface/components/search-input';
import SearchWrapper from '@/interface/components/search-results';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='grid min-h-screen items-center justify-items-center gap-2'>
      <StateProvider>
        <header className='sticky top-0 z-10 row-start-1 flex w-full flex-wrap items-center justify-center gap-6 border-b-2 bg-slate-50 p-4 text-black'>
          <Image src='/icon.svg' alt='Search icon' width={50} height={50} />
          <SearchInput />
        </header>
        <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
          <div className='min-h-screen p-4'>
            <SearchWrapper />
          </div>
          <BackToTopButton />
        </main>
      </StateProvider>
      <footer className='row-start-3 flex w-full flex-wrap items-center justify-center gap-6 bg-black p-4 text-white'>
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
  );
}
