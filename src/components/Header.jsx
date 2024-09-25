import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { FaGraduationCap, FaChalkboardTeacher, FaImages, FaNewspaper, FaUsers } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import config from '../config.json';

const menuItems = [
  { icon: <AiOutlineHome className="w-5 h-5" />, text: 'Home', link: '/' },
  { icon: <FaUsers className="w-5 h-5" />, text: 'About Us', link: '/about' },
  { icon: <FaGraduationCap className="w-5 h-5" />, text: 'Academic Programs', link: '/academic' },
  { icon: <FaNewspaper className="w-5 h-5" />, text: 'News', link: '/news' },
  { icon: <FaChalkboardTeacher className="w-5 h-5" />, text: 'Teachers', link: '/teachers' },
  { icon: <FaImages className="w-5 h-5" />, text: 'Gallery', link: '/gallery' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoPath = config.logoUrl;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={clsx(
      'fixed w-full top-0 left-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-blue-600 bg-opacity-95 shadow-lg' : 'bg-transparent'
    )}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4 border-b border-blue-400 border-opacity-50'>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src="/src/assets/logo.png" alt="Company Logo" className='h-16 w-16 rounded-full border-teal-200'/>
            </Link>
            <h1 className={clsx(
              'text-2xl font-bold font-serif',
              isScrolled ? 'text-white' : 'text-blue-700'
            )}>
              Shree Gaumati Secondary School
            </h1>
          </div>
          <nav className='hidden md:block'>
            <ul className='flex space-x-6'>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className={clsx(
                      'text-base font-semibold transition-all duration-300 flex items-center group',
                      isScrolled ? 'text-white hover:text-yellow-300' : 'text-blue-700 hover:text-blue-900'
                    )}
                  >
                    <span className="mr-2 text-yellow-400 group-hover:animate-bounce">{item.icon}</span>
                    <span className="relative">
                      {item.text}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button 
            className={clsx(
              'md:hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-2',
              isScrolled ? 'text-white' : 'text-blue-700'
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <nav className={clsx(
        'md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-blue-600 bg-opacity-95 transform transition-transform duration-300 ease-in-out overflow-y-auto',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <ul className="px-4 py-8 flex flex-col justify-start space-y-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.link} 
                className="text-white text-2xl font-semibold hover:text-yellow-300 transition-colors duration-300 flex items-center group py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-4 text-yellow-400 group-hover:animate-bounce text-3xl">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}