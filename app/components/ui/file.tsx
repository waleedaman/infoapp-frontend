import React, { useState, useRef, useCallback } from 'react';

interface FileDropAreaProps {
  onFilesDrop: (files: File[]) => void;
  className?: string;
  message?: string;
}

const FileDropArea: React.FC<FileDropAreaProps> = ({ 
  onFilesDrop, 
  className = "", 
  message = "Drag and drop files here, or click to browse"
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesDrop(filesArray);
    }
  }, [onFilesDrop]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesDrop(filesArray);
    }
  }, [onFilesDrop]);

  return (
    <div 
      className={`${className} ${isDragActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'} 
        border-2 border-dashed rounded-lg p-6 transition-colors duration-200 text-center cursor-pointer`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        ref={fileInputRef} 
        type="file" 
        multiple 
        className="hidden" 
        onChange={handleFileChange} 
      />
      <div className="flex flex-col items-center justify-center">
        <svg 
          className="w-12 h-12 mb-3 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          PDF, DOC, DOCX, JPG, PNG up to 10MB
        </p>
      </div>
    </div>
  );
};

export default FileDropArea;
