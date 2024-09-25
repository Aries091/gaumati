import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Teachers = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [loadingTeacherData, setLoadingTeacherData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/teachers/getTeachers");
        if (!response.ok) throw new Error("Failed to fetch teacher data");
        const data = await response.json();
        setTeacherData(data.teachers || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load teacher data.");
      } finally {
        setLoadingTeacherData(false);
      }
    };
    fetchTeacherData();
  }, []);

  const getProfilePicture = (teacher) => {
    if (teacher.profilePicture) {
      return `http://localhost:3000/${teacher.profilePicture.replace(/\\/g, '/')}`;
    }
    return 'https://via.placeholder.com/150';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-white to-gray-100 py-20 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-extrabold text-center mb-12 text-gray-800"
        >
          Our Teachers
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loadingTeacherData ? (
            <p className="text-center text-gray-600 col-span-full">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600 col-span-full">{error}</p>
          ) : teacherData.length > 0 ? (
            teacherData.map((teacher, index) => (
              <motion.div
                key={teacher._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={getProfilePicture(teacher)}
                  alt={teacher.name || 'Teacher'}
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-blue-100 shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{teacher.name || 'Unknown'}</h3>
                <p className="text-blue-600 font-semibold mb-3">{teacher.position || 'Position not specified'}</p>
                <p className="text-gray-600 mb-1">{teacher.address || 'Address not provided'}</p>
                <p className="text-gray-600">{teacher.phonenumber || 'Phone number not available'}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No teachers available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Teachers;