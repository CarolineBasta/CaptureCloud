import React, { useState } from 'react';

const ARpopup = ({ onConfirm, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const albums = JSON.parse(localStorage.getItem('albums')) || []; 
    const duplicate = albums.some((album) => album.name === inputValue.trim());
  
    if (!inputValue.trim()) {
      setError('name cannot be empty.');
    } else if (duplicate) {
      setError('name already exists.');
    } else {
      setError('');
      onConfirm(inputValue.trim()); 
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-black w-auto min-w-[500px] h-1/4 max-w-md relative flex flex-col justify-center items-center">
        <div className="flex items-center w-full">
          <label htmlFor="albumInput" className="text-black mr-2 mb-4">Album</label>
          <input 
            id="albumInput"
            type="text" 
            placeholder="50 characters max."
            maxLength="50"
            className="block w-full p-2 border-2 border-[#6AABD2] rounded-full focus:outline-none placeholder:italic placeholder:text-sm mb-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button 
          className="text-black rounded-full shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mt-2"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          onClick={onClose} 
          className="absolute top-3 right-3 text-bold text-gray-500 hover:text-gray-700 text-2xl"
          title = "Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ARpopup;
