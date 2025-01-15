'use client';
import { validateStringField } from '@/infra/utils/validate-field';
import Input from './form/input/input';
import Select from './form/select/select';
import useHandleForm from '@/infra/hooks/use-handle-form';

const RestaurantForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    listOfCuisine,
    diningStyleOptions,
  } = useHandleForm({
    reviews_count: 0,
    price: 0,
    stars_count: 0,
  });

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
          label='Area'
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

        <Select
          label='Payment Options *'
          error={errors?.payment_options?.message}
          {...register('payment_options', {
            required: 'At least one payment option is required',
          })}
          options={['Cash', 'Visa', 'MasterCard', 'American Express']}
        />

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

        <Select
          label='Food Type *'
          error={errors?.food_type?.message}
          {...register('food_type', { required: 'Food type is required' })}
          options={listOfCuisine}
        />

        <Select
          label='Dining Style *'
          error={errors?.dining_style?.message}
          {...register('dining_style', {
            required: 'Dining style is required',
          })}
          options={diningStyleOptions}
        />
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
