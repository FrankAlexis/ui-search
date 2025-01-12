import { Restaurant } from '@/domain/restaurant';
import Image from 'next/image';
import RestaurantRating from './restaurant-rating';

export default function RestaurantHit({ hit }: { hit: Restaurant }) {
  return (
    <article className='mx-auto max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-md'>
      <figure className='relative mb-4 flex justify-center'>
        <Image
          src={hit.image_url}
          alt={hit.name}
          width={150}
          height={150}
          priority={true}
        />
        <span className='absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700'>
          <RestaurantRating rating={hit.stars_count} />
        </span>
      </figure>
      <header className='h-14'>
        <h2 className='line-clamp-2 text-xl font-bold text-gray-800'>
          {hit.name}
        </h2>
      </header>
      <section>
        <div className='mt-2 flex items-center'>
          <span className='flex items-center text-sm text-gray-500'>
            <Image
              src='/comment.svg'
              width={20}
              height={20}
              alt='Comment icon'
              className=''
            />
            {hit.reviews_count} reviews
          </span>
          <span className='ml-2 flex items-center text-sm text-gray-500'>
            <Image
              src='/money.svg'
              width={20}
              height={20}
              alt='money icon'
              className='mr-1'
            />
            {hit.price_range}
          </span>
        </div>
        <div className='mt-2 line-clamp-2'>
          <p className='flex items-center gap-2 break-words text-gray-600'>
            <Image
              src='/food.svg'
              width={17}
              height={17}
              alt='food icon'
              className=''
            />
            {hit.food_type}
          </p>
        </div>
        <div className='mb-1 line-clamp-2'>
          <p className='flex items-center text-sm text-gray-500'>
            <Image
              src='/address.svg'
              width={20}
              height={20}
              alt='address icon'
              className='mr-1'
            />
            {hit.neighborhood}
          </p>

          <p className='mt-1 line-clamp-2 flex text-sm text-gray-500'>
            {hit.address}, {hit.city}
          </p>
        </div>
        <div>
          <h3 className='mt-2 text-sm font-semibold text-gray-600'>
            {' '}
            Payment Options{' '}
          </h3>
          {hit.payment_options.map((option) => (
            <span
              key={option}
              className='mr-2 mt-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-500'
            >
              {option}
            </span>
          ))}
        </div>
      </section>
      <footer className='mt-4'>
        <a
          href={`tel:${hit.phone_number}`}
          className='flex items-center gap-2 text-sm text-blue-500 hover:underline'
        >
          <Image
            src='/phone.svg'
            width={20}
            height={20}
            alt='phone icon'
            className=''
          />
          {hit.phone_number}
        </a>
        <div className='mt-4 flex items-center justify-center'>
          <a
            href={hit.reserve_url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
          >
            Reserve Now
          </a>
        </div>
      </footer>
    </article>
  );
}
