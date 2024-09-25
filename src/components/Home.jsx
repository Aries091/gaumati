import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from '../config.json';
import NoticeModal from './pages/NoticeModal';

export default function Home() {
  const [imagePaths, setImagePaths] = useState([]);
  const [notices, setNotices] = useState([]);
  const [whoAreWe, setWhoAreWe] = useState({});
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setWhoAreWe(config.whoAreWe || {});
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recentnotices/getnotices");
        if (!response.ok) throw new Error("Failed to fetch notices");
        const data = await response.json();
        setNotices(data.notices || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load notices.");
      } finally {
        setLoadingNotices(false);
      }
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    const fetchImagePaths = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carouselItems/getCarousels");
        if (!response.ok) throw new Error("Failed to fetch carousel images");
        const data = await response.json();
        setImagePaths(data.carousel || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load carousel images.");
      } finally {
        setLoadingImages(false);
      }
    };
    fetchImagePaths();
  }, []);

  const openNoticeModal = (notice) => {
    setSelectedNotice(notice);
  };

  const closeNoticeModal = () => {
    setSelectedNotice(null);
  };

  const openImageModal = (item) => {
    setSelectedImage(item);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className='relative min-h-screen'>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-green-800 opacity-75">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className='relative z-10 bg-opacity-90 bg-gray-100 w-full py-10 pt-24'>
        {/* Adjusted padding-top to push the content down */}
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between px-4 sm:px-6 py-12 gap-6'>
          {/* Carousel Section */}
          <div className='w-full lg:w-2/3 mb-6 lg:mb-0 overflow-hidden rounded-lg shadow-lg'>
            {loadingImages ? (
              <div className="flex justify-center items-center h-64 bg-gray-200">
                <p className="text-xl text-gray-600">Loading images...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64 bg-gray-200">
                <p className="text-xl text-red-600">{error}</p>
              </div>
            ) : imagePaths.length > 0 ? (
              <div className="relative">
                <Slider {...settings}>
                  {imagePaths.map((item, index) => (
                    <div key={index} className="outline-none">
                      <div className="relative aspect-w-16 aspect-h-9">
                        <img 
                          src={`http://localhost:3000/${item.images[0]}`} 
                          alt={item.title} 
                          className="w-full h-full object-cover cursor-pointer" 
                          onClick={() => openImageModal(item)}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                          <h2 className='text-lg font-semibold'>{item.title}</h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded-tl-md">
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-64 bg-gray-200">
                <p className="text-xl text-gray-600">No images available</p>
              </div>
            )}
          </div>

          {/* Notice Section */}
          <div className='w-full lg:w-1/3 bg-white border border-gray-200 shadow-lg p-4 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-blue-900'>Notice Section</h2>
            {loadingNotices ? (
              <p>Loading notices...</p>
            ) : error ? (
              <p>{error}</p>
            ) : notices.length > 0 ? (
              <ul className='space-y-2'>
                {notices.map((notice, index) => (
                  <li 
                    key={index} 
                    className='cursor-pointer text-gray-600 hover:text-blue-600 transition-colors' 
                    onClick={() => openNoticeModal(notice)}
                  >
                    {notice.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notices available</p>
            )}
          </div>
        </div>

        {/* Who are we Section */}
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 py-12'>
          <div className='flex flex-col justify-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg' data-aos="fade-right">
            <h2 className='text-3xl font-bold mb-4 text-blue-900'>{whoAreWe.title}</h2>
            <p className='text-gray-700'>
              {whoAreWe.text}
            </p>
          </div>
          <div className='flex justify-center' data-aos="fade-left">
            <img
              src={whoAreWe.image}
              alt='Who are we'
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        </div>
      </div>

      {/* Render NoticeModal if a notice is selected */}
      {selectedNotice && (
        <NoticeModal 
          notice={selectedNotice} 
          onClose={closeNoticeModal} 
        />
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImageModal}>
          <div className="max-w-4xl w-full p-4 relative">
            <img src={`http://localhost:3000/${selectedImage.images[0]}`} alt={selectedImage.title} className="w-full h-auto rounded-lg shadow-lg"/>
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={closeImageModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}