import { useCallback } from 'react';
import { useStateContext } from '@/infra/hooks/state-context';
import { setQueryParam } from '@/infra/utils/set-query-param';

const FilterOfCuisine = () => {
  const { setInputValue, listOfCuisine } = useStateContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setQueryParam(e.target.value);
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  return (
    <div className=''>
      <select
        className='w-80 rounded-lg border border-gray-300 px-4 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
        onChange={handleChange}
      >
        <option value=''>Filter by cuisine...</option>
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
