import React from 'react';

const AcademicModal = ({ program, onClose }) => {
  if (!program) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[90vw] h-[90vh] max-w-[1200px] max-h-[1800px] overflow-y-auto relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-600 text-2xl font-bold'>
          &times;
        </button>
        <h2 className='text-3xl font-bold mb-4'>{program.title}</h2>
        <img src={program.image} alt={program.title} className="w-full h-auto max-h-[40vh] object-cover mb-4" />
        <p className='text-lg'>{program.description}</p>
      </div>
    </div>
  );
};

export default AcademicModal;
