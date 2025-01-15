import { useCallback } from 'react';
import { useStateContext } from '@/infra/hooks/state-context';
import { removeQueryParam, setQueryParam } from '@/infra/utils/set-query-param';

const FilterOfCuisine = () => {
  const { setFoodType, listOfCuisine, foodType } = useStateContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) {
        removeQueryParam('cuisine');
        setFoodType('');
        return;
      }
      setQueryParam('cuisine', e.target.value);
      setFoodType(e.target.value);
    },
    [setFoodType]
  );

  return (
    <div className=''>
      <select
        value={foodType}
        className='w-80 rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={handleChange}
      >
        <option value=''>Filter by cuisine ...</option>
        {listOfCuisine?.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOfCuisine;
