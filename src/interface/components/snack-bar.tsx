import { useStateContext } from '@/infra/hooks/state-context';
import Image from 'next/image';

const SnackBar = () => {
  const { message, setMessage } = useStateContext();

  return (
    <>
      {message && (
        <div
          className={`fixed right-4 top-[5.5rem] z-20 flex items-center rounded ${message.type === 'success' ? 'text-gray bg-slate-200' : 'bg-red-500 text-white'} px-4 py-2 shadow-md`}
        >
          {message.text}
          <button
            onClick={() => setMessage(undefined)}
            className='ml-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-300'
          >
            <Image
              src='/x-icon.svg'
              width={20}
              height={20}
              alt='Delete icon'
              className=''
            />
          </button>
        </div>
      )}
    </>
  );
};

export default SnackBar;
