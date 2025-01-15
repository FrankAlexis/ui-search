import { FC } from 'react';
import ErrorMessage from '../error-message';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string | null;
  options: string[];
}

const Select: FC<Props> = ({ label, error, options, ...props }) => {
  return (
    <div className='mb-4'>
      <label className='mb-2 block font-semibold text-gray-700'>{label}</label>
      <select
        {...props}
        className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <option value=''>Select a option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Select;
