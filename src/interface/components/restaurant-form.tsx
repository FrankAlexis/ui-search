'use client';
import { RestaurantFormValues } from '@/domain/restaurant';
import { useStateContext } from '@/infra/hooks/state-context';
import { CreateRestaurantsUseCase } from '@/use-cases/create-restaurant.use-case';
import { useForm, SubmitHandler } from 'react-hook-form';

const RestaurantForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    defaultValues: {
      reviews_count: 0,
      price: 0,
    },
  });

  const { setMessage, loading } = useStateContext();

  const onSubmit: SubmitHandler<RestaurantFormValues> = (data) => {
    console.log(data);
    const transformData = {
      ...data,
      price_range: `${data.price_range_min} to ${data.price_range_max}`,
    };
    CreateRestaurantsUseCase.execute(transformData)
      .then((id) => {
        setMessage({
          type: 'success',
          text: `Restaurant added successfully with ID: ${id}`,
        });
      })
      .catch((error) => {
        setMessage({
          type: 'error',
          text: error.message,
        });
      })
      .finally(() => setTimeout(() => setMessage(undefined), 5000));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto rounded-lg border border-gray-200 bg-white p-6 shadow-md'
    >
      <h2 className='mb-6 text-2xl font-bold text-gray-800'>Restaurant Form</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Address
          </label>
          <input
            {...register('address', { required: 'Address is required' })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.address && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.address.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>Area</label>
          <input
            {...register('area', { required: 'Area is required' })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.area && (
            <p className='mt-1 text-sm text-red-500'>{errors.area.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.city && (
            <p className='mt-1 text-sm text-red-500'>{errors.city.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Payment Options
          </label>
          <select
            {...register('payment_options', {
              required: 'At least one payment option is required',
            })}
            multiple
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='AMEX'>AMEX</option>
            <option value='Carte Blanche'>Carte Blanche</option>
            <option value='Diners Club'>Diners Club</option>
            <option value='Discover'>Discover</option>
            <option value='MasterCard'>MasterCard</option>
            <option value='Visa'>Visa</option>
          </select>
          {errors.payment_options && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.payment_options.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Reviews count
          </label>
          <input
            {...register('reviews_count', {
              required: 'Reviews count is required',
              valueAsNumber: true,
            })}
            placeholder='0'
            type='number'
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.price && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.reviews_count?.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Price
          </label>
          <input
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
            })}
            placeholder='0'
            type='number'
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.price && (
            <p className='mt-1 text-sm text-red-500'>{errors.price.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Phone Number
          </label>
          <input
            {...register('phone_number', {
              required: 'Phone number is required',
            })}
            type='tel'
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.phone_number && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.phone_number.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Neighborhood
          </label>
          <input
            {...register('neighborhood', {
              required: 'Neighborhood is required',
            })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.neighborhood && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.neighborhood.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Website
          </label>
          <input
            {...register('website')}
            type='url'
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.website && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.website.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Price Range
          </label>
          <div className='flex space-x-4'>
            <input
              {...register('price_range_min', {
                required: 'Minimum price is required',
                valueAsNumber: true,
              })}
              placeholder='Min'
              type='number'
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              {...register('price_range_max', {
                required: 'Maximum price is required',
                valueAsNumber: true,
              })}
              placeholder='Max'
              type='number'
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          {errors.price_range_min && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.price_range_min.message}
            </p>
          )}
          {errors.price_range_max && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.price_range_max.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Food Type
          </label>
          <select
            {...register('food_type', { required: 'Food type is required' })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select Food Type</option>
            <option value='Italian'>Italian</option>
            <option value='Chinese'>Chinese</option>
            <option value='Mexican'>Mexican</option>
            <option value='Indian'>Indian</option>
          </select>
          {errors.food_type && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.food_type.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Dining Style
          </label>
          <select
            {...register('dining_style', {
              required: 'Dining style is required',
            })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select Dining Style</option>
            <option value='Casual Dining'>Casual Dining</option>
            <option value='Fine Dining'>Fine Dining</option>
            <option value='Fast Food'>Fast Food</option>
          </select>
          {errors.dining_style && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.dining_style.message}
            </p>
          )}
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='mx-auto block rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600'
      >
        {loading ? (
          <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-blue-100' />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default RestaurantForm;
