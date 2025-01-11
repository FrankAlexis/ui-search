import { use } from 'react';
import { FetchRestaurantsUseCase } from '@/use-cases/fetch-restaurants.use-case';
import { Restaurant } from '@/domain/restaurant';
import RestaurantHit from '@/interface/components/restaurant-hit';
import Image from 'next/image';

export default function Home() {
  const restaurants = use<Restaurant[]>(FetchRestaurantsUseCase.execute());

  return (
    <div className='grid min-h-screen items-center justify-items-center gap-16'>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <div className='min-h-screen p-4'>
          <h1 className='mb-6 text-center text-3xl font-bold'>
            Restaurant Search
          </h1>

          <div className='mt-8'>
            <h2 className='text-2xl font-semibold'>Results</h2>
            <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
              {restaurants.map((restaurant) => (
                <li key={restaurant.objectID} className='max-w-md'>
                  <RestaurantHit hit={restaurant} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex w-full flex-wrap items-center justify-center gap-6 bg-black p-4 text-white'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
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
          Learn
        </a>
      </footer>
    </div>
  );
}
