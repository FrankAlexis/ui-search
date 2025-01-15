'use client';
import { useEffect, useState } from 'react';
import { RestaurantFormValues } from '@/domain/restaurant';
import { useStateContext } from '@/infra/hooks/state-context';
import { CreateRestaurantsUseCase } from '@/use-cases/create-restaurant.use-case';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FetchFilterByAttributeUseCase } from '@/use-cases/fetch-filter-by-attribute.use-case';

const useHandleForm = (initialState: Partial<RestaurantFormValues>) => {
  const [diningStyleOptions, setDiningStyleOptions] = useState<string[]>([]);
  const { setMessage, listOfCuisine } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    FetchFilterByAttributeUseCase.execute('dining_style').then(
      setDiningStyleOptions
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RestaurantFormValues>({
    mode: 'onChange',
    defaultValues: initialState,
  });

  const onSubmit: SubmitHandler<RestaurantFormValues> = async (data) => {
    setIsLoading(true);
    const cleanData = {
      ...data,
      payment_options: [data.payment_options],
    };
    try {
      const id = await CreateRestaurantsUseCase.execute(cleanData);
      setMessage({
        type: 'success',
        text: `Restaurant added successfully ${id ? `with ID: ${id}` : ''}`,
      });
      reset();
    } catch (error) {
      setMessage({
        type: 'error',
        text: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    diningStyleOptions,
    listOfCuisine,
  };
};
export default useHandleForm;
