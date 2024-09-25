import React, { useState, useEffect } from 'react';
import config from '../config.json';
import Modal from './pages/AcademicModal';
import { motion } from 'framer-motion';

export default function Academic() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    setPrograms(config.programs);
  }, []);

  const openModal = (program) => {
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedProgram(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='py-[100px]'
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-center mb-10'
      >
        <h1 className='text-4xl font-bold'>Academic Programs</h1>
      </motion.div>
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='shadow-lg border border-gray-200 rounded-lg overflow-hidden cursor-pointer'
            onClick={() => openModal(program)}
          >
            <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
            <div className='p-4'>
              <h2 className='text-2xl font-bold mb-2'>{program.title}</h2>
              <p>{program.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal program={selectedProgram} onClose={closeModal} />
    </motion.div>
  );
}