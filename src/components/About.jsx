import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import config from '../config.json';

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState({});

  useEffect(() => {
    setAboutUsData(config.aboutUs || {});
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-700 min-h-screen text-white pt-24">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-5xl font-extrabold text-center mb-12"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          About Us
        </motion.h1>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.img
            src={'/src/assets/headtecherphoto.JPG'}
            alt="About Us"
            className="w-full md:w-1/2 rounded-lg shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">{aboutUsData.title}</h2>
            <p className="text-lg leading-relaxed mb-6">
              {aboutUsData.text}
            </p>
            <div className="border-t border-blue-400 pt-6">
              <p className="text-xl font-semibold">{aboutUsData.chairmanName}</p>
              <p className="text-md text-blue-200">{aboutUsData.chairmanTitle}</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <ChevronDown size={32} className="mx-auto animate-bounce" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;