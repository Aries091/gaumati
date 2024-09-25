import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ article, onClose }) {
  if (!article) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>
        <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
        <img 
          src={`http://localhost:3000/${article.images[0]}`} 
          alt={article.title} 
          className="w-full h-80 object-cover mb-6" 
        />
        
        {/* Render description as HTML and ensure overflow is handled */}
        <div 
          className="text-gray-700 text-lg mb-6 overflow-y-auto" 
          style={{ maxHeight: '150px', wordWrap: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: article.description }} 
        />

        <div 
          className="text-gray-700 text-lg overflow-y-auto" 
          style={{ maxHeight: '300px', wordWrap: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </div>
    </div>,
    document.body
  );
}
