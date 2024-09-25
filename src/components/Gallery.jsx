import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gallery/getgallery");
        if (!response.ok) throw new Error("Failed to fetch gallery images");
        const data = await response.json();
        setImages(data.gallery || []);
        setCurrentIndex(Math.floor((data.gallery.length || 0) / 2));
      } catch (error) {
        console.error(error);
        setError("Failed to load images.");
      } finally {
        setLoadingImages(false);
      }
    };
    fetchImages();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  if (loadingImages) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-28 md:pt-32 lg:pt-36 pb-10 px-4 md:px-6 lg:px-8 relative" // Adjusted top padding
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12" // Adjusted bottom margin
      >
        <h1 className="text-4xl font-bold">Gallery</h1>
      </motion.div>

      {/* Main container */}
      <div
        ref={galleryRef}
        className="relative flex items-center justify-center h-[55vh] md:h-[65vh] max-w-[90%] md:max-w-[80%] mx-auto overflow-hidden" // Adjusted height
      >
        {images.map((image, index) => (
          <motion.div
            key={image._id || index}
            className="absolute cursor-pointer"
            initial={false}
            animate={{
              x: (index - currentIndex) * (isMobile ? 150 : 300),
              scale: index === currentIndex ? 1.1 : 0.9,
              opacity: Math.abs(index - currentIndex) <= 2 ? 1 : 0.5,
              zIndex: index === currentIndex ? 10 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => handleImageClick(image)}
            whileHover={{ scale: 1.15 }}
          >
            <img
              src={`http://localhost:3000/${image.images[0]}`}
              alt={image.slug || 'image'}
              className="w-[170px] h-[170px] md:w-[220px] md:h-[220px] lg:w-[270px] lg:h-[270px] object-cover rounded-lg shadow-lg" // Adjusted image sizes
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {image.slug}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 md:p-4 rounded-full z-20 text-xl md:text-2xl"
        onClick={handlePrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        &lt;
      </motion.button>
      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 md:p-4 rounded-full z-20 text-xl md:text-2xl"
        onClick={handleNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        &gt;
      </motion.button>

      {/* Pop-up Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl bg-white p-4 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`http://localhost:3000/${selectedImage.images[0]}`}
                alt={selectedImage.slug || 'Full size image'}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <motion.button
                onClick={closePopup}
                className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 text-3xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              <motion.div 
                className="mt-2 text-center text-gray-800 text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedImage.slug}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}