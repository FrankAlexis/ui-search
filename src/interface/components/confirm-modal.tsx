import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string | React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`relative w-96 transform rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <button
          className='absolute right-2 top-2 text-gray-600 hover:text-gray-900'
          onClick={onClose}
        >
          <Image
            src='/x-icon.svg'
            width={30}
            height={30}
            alt='Close icon'
            className='rounded-full bg-white hover:bg-gray-200'
          />
        </button>
        <h2 className='mb-4 text-xl'>{message}</h2>
        <div className='flex justify-end space-x-4'>
          <button
            className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700'
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className='rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
