import React from 'react';

const CrouselModal = ({ imagePath, onClose }) => {
  if (!imagePath || !imagePath.images || imagePath.images.length === 0) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
      <div className='relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-white text-2xl font-bold'>
          &times;
        </button>
        <img src={`http://localhost:3000/${imagePath.images[0]}`} alt="Zoomed" className='max-w-full max-h-full rounded-lg shadow-lg' />
      </div>
    </div>
  );
};

export default CrouselModal;
