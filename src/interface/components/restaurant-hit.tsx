import { Restaurant } from '@/domain/restaurant';
import Image from 'next/image';

export default function RestaurantHit({ hit }: { hit: Restaurant }) {
  return (
    <article className='overflow-hidden rounded-lg bg-white p-4 shadow-md'>
      <figure className='relative mb-4'>
        <Image
          src={hit.image_url}
          alt={hit.name}
          width={200}
          height={150}
          className='mx-auto rounded-md'
        />
        <span className='absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700'>
          {hit.price_range}
        </span>
      </figure>
      <header className=''>
        <h2 className='break-words text-xl font-bold text-gray-800'>
          {hit.name}
        </h2>
      </header>
      <section>
        <div>
          <span className='text-lg font-bold text-yellow-500'>
            {hit.stars_count}
          </span>
          <span className='ml-2 text-sm text-gray-500'>
            ({hit.reviews_count} reviews)
          </span>
        </div>
        <div className='mt-2'>
          <p className='break-words text-gray-600'>{hit.food_type}</p>
          <p className='break-words text-sm text-gray-500'>
            {hit.address}, {hit.city}, {hit.state} {hit.postal_code}
          </p>
          <p className='break-words text-sm text-gray-500'>
            Neighborhood: {hit.neighborhood}
          </p>
        </div>
      </section>
      <footer className='mt-4'>
        <a
          href={`tel:${hit.phone_number}`}
          className='text-sm text-blue-500 hover:underline'
        >
          Call: {hit.phone_number}
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
