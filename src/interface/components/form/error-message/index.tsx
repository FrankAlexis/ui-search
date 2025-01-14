interface ErrorMessageProps {
  error?: string | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return error && <p className='mt-1 text-sm text-red-500'>{error}</p>;
};

export default ErrorMessage;
