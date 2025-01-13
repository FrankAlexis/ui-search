import SearchInput from '@/interface/components/search-input';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-10 row-start-1 flex w-full flex-wrap items-center justify-center gap-6 border-b-2 bg-slate-50 p-4 text-black'>
      <Link href='/' className='rounded-full p-2 hover:bg-blue-50'>
        <Image src='/icon.svg' alt='Search icon' width={50} height={50} />
      </Link>
      <SearchInput />
      <Link href='/restaurant' className='rounded-full p-2 hover:bg-blue-50'>
        <Image
          src='/add.svg'
          alt='Go to create restaurant'
          width={40}
          height={40}
          className='cursor-pointer'
        />
      </Link>
    </header>
  );
};

export default Header;
