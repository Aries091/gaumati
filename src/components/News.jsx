import React, { useState, useEffect } from 'react';
import Modal from './pages/NewsModal';
import { motion } from 'framer-motion';

export default function News() {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/news/getnews");
        const data = await response.json();
        setNews(data.news);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4 sm:px-6 lg:px-8 mt-16"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">News</h1>
      </div>
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <motion.div
            key={article._id} // Using _id as the unique key
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="shadow-lg border border-gray-200 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img src={`http://localhost:3000/${article.images[0]}`} alt={article.title} className="w-full h-48 sm:h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <button
                onClick={() => openModal(article)}
                className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedArticle && <Modal article={selectedArticle} onClose={closeModal} />}
    </motion.div>
  );
}