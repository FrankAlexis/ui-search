'use client';
import { RestaurantFormValues } from '@/domain/restaurant';
import { useStateContext } from '@/infra/hooks/state-context';
import { validateStringField } from '@/infra/utils/validate-field';
import { CreateRestaurantsUseCase } from '@/use-cases/create-restaurant.use-case';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorMessage from './form/error-message';
import Input from './form/input/input';

const RestaurantForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setMessage } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RestaurantFormValues>({
    mode: 'all',
    defaultValues: {
      reviews_count: 0,
      price: 0,
      stars_count: 0,
    },
  });

  const onSubmit: SubmitHandler<RestaurantFormValues> = (data) => {
    setIsLoading(true);
    const cleanData = {
      ...data,
      payment_options: [data.payment_options],
    };
    CreateRestaurantsUseCase.execute(cleanData)
      .then((id) => {
        setMessage({
          type: 'success',
          text: `Restaurant added successfully ${id ? `with ID: ${id}` : ''}`,
        });
        reset();
      })
      .catch((error) => {
        setMessage({
          type: 'error',
          text: (error as Error).message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto min-w-fit rounded-lg border border-gray-200 bg-white p-6 shadow-md'
    >
      <h2 className='mb-6 text-2xl font-bold text-gray-800'>Restaurant Form</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Input
          label='Name *'
          error={errors?.name?.message}
          {...register('name', {
            required: 'Name is required',
            validate: (value) => validateStringField(value, 'Name'),
          })}
        />

        <Input
          label='Address *'
          error={errors?.address?.message}
          {...register('address', {
            required: 'Address is required',
            validate: (value) => validateStringField(value, 'Address'),
          })}
        />

        <Input
          label='Area *'
          error={errors?.area?.message}
          {...register('area')}
        />

        <Input
          label='City *'
          error={errors?.city?.message}
          {...register('city', {
            required: 'City is required',
            validate: (value) => validateStringField(value, 'City'),
          })}
        />

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Payment Options *
          </label>
          <select
            {...register('payment_options', {
              required: 'At least one payment option is required',
            })}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='AMEX'>AMEX</option>
            <option value='Carte Blanche'>Carte Blanche</option>
            <option value='Diners Club'>Diners Club</option>
            <option value='Discover'>Discover</option>
            <option value='MasterCard'>MasterCard</option>
            <option value='Visa'>Visa</option>
          </select>
          <ErrorMessage error={errors?.payment_options?.message} />
        </div>

        <Input
          label='Reviews count *'
          type='number'
          error={errors?.reviews_count?.message}
          {...register('reviews_count', {
            required: 'Reviews count is required',
            validate: (value) => {
              const num = Number(value);
              if (num < 0) {
                return 'Reviews count must be a positive number';
              }

              return true;
            },
          })}
        />

        <Input
          label='Stars count *'
          placeholder='0.0'
          error={errors?.stars_count?.message}
          {...register('stars_count', {
            required: 'Stars count is required',
            validate: (value) => {
              const num = Number(value);
              if (num < 0 || num > 5) {
                return 'Stars count must be between 0 and 5';
              }

              return true;
            },
          })}
        />

        <Input
          label='Price *'
          error={errors?.price?.message}
          {...register('price', {
            required: 'Price is required',
            valueAsNumber: true,
            validate: (value) => {
              const num = Number(value);
              if (num < 0) {
                return 'Price must be a positive number';
              }

              return true;
            },
          })}
          placeholder='0'
          type='number'
        />

        <Input
          label='Phone Number *'
          error={errors?.phone_number?.message}
          {...register('phone_number', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9\s.-]{5,15}$/,
              message: 'The phone is invalid',
            },
          })}
          type='tel'
        />

        <Input
          label='Neighborhood *'
          error={errors?.neighborhood?.message}
          {...register('neighborhood', {
            required: 'Neighborhood is required',
            validate: (value) => validateStringField(value, 'Neighborhood'),
          })}
        />

        <Input
          label='Reserve url'
          error={errors?.reserve_url?.message}
          {...register('reserve_url', {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'The URL is invalid',
            },
          })}
          type='url'
        />

        <Input
          label='Price Range *'
          error={errors?.price_range?.message}
          {...register('price_range', {
            required: 'Prince range is required',
          })}
          placeholder='$0 to $100'
        />

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Food Type *
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
          <ErrorMessage error={errors?.food_type?.message} />
        </div>

        <div className='mb-4'>
          <label className='mb-2 block font-semibold text-gray-700'>
            Dining Style *
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
          <ErrorMessage error={errors?.dining_style?.message} />
        </div>
      </div>
      <button
        type='submit'
        className='mx-auto block rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600'
      >
        {isLoading ? (
          <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-blue-100' />
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default RestaurantForm;
