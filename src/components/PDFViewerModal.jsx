import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PDFViewerModal = ({ isOpen, onClose, pdfUrl, title = 'PDF Viewer' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-[90vw] h-[90vh] max-w-6xl mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-primary-500 dark:text-accent-400 transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* PDF Viewer */}
        <div className="h-[calc(100%-80px)] p-4">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full rounded-lg border border-primary-200 dark:border-dark-700"
              title={title}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-primary-500 dark:text-primary-400">
                PDF not available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;


