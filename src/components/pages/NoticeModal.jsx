import React from 'react';
import ReactDOM from 'react-dom';

export default function NoticeModal({ notice, onClose }) {
  if (!notice) return null;

  const isPdf = notice.document && notice.document.endsWith('.pdf');
  const isDoc = notice.document && (notice.document.endsWith('.doc') || notice.document.endsWith('.docx'));

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
        >
          &times;
        </button>
        <h1 className="text-3xl font-bold mb-6">{notice.slug}</h1>
        
        {notice.images && notice.images.length > 0 && (
          <img
            src={`http://localhost:3000/${notice.images[0]}`}
            alt={notice.title}
            className="w-full h-auto max-h-96 object-contain mb-6"
          />
        )}
        <div
          className="text-gray-700 text-lg mb-6"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        />
        
        {notice.document && (
          <div className="flex justify-center">
            <a
              href={`http://localhost:3000/${notice.document}`}
              download
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              {isPdf ? "Download PDF" : isDoc ? "Download Document" : "Download File"}
            </a>
          </div>
        )}

        {notice.pdfs && notice.pdfs.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Attached PDFs:</h2>
            {notice.pdfs.map((pdf, index) => (
              <div key={index} className="mb-2">
                <a 
                  href={`http://localhost:3000/${pdf}`}
                  download
                  className="text-blue-600 hover:text-blue-800"
                >
                  Download PDF {index + 1}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}