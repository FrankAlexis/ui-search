import Image from 'next/image';

export interface RestaurantRatingProps {
  rating: number;
  maxStars?: number;
}

const RestaurantRating: React.FC<RestaurantRatingProps> = ({
  rating,
  maxStars = 5,
}) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if a half star is needed
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Calculate empty slots

  return (
    <div className='flex items-center space-x-1'>
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <Image
            key={`full-${index}`}
            src='/full-star.svg'
            width={12}
            height={12}
            alt='full icon'
            className=''
          />
        ))}
      {/* Render half star (if applicable) */}
      {hasHalfStar && (
        <Image
          key={`half-star`}
          src='/half-star.svg'
          width={12}
          height={12}
          alt='half icon'
          className=''
        />
      )}
      {/* Render empty stars (optional, for consistent spacing) */}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <Image
            key={`empty-${index}`}
            src='/empty-star.svg'
            width={12}
            height={12}
            alt='empty icon'
            className=''
          />
        ))}
      <span className='ml-2 text-sm text-gray-500'>{rating}</span>
    </div>
  );
};

export default RestaurantRating;
