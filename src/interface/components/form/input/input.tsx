import { FC } from 'react';
import ErrorMessage from '../error-message';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  name: string;
}

const Input: FC<Props> = ({ label, error, name, ...props }) => {
  return (
    <div className='mb-4'>
      <label className='mb-2 block font-semibold text-gray-700'>{label}</label>
      <input
        {...props}
        name={name}
        className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <ErrorMessage error={error} />
    </div>
  );
};
export default Input;
