import React, { useState, useRef } from 'react';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';

function Soldpopup({ isOpen, handleClose, image }) {
  const [caption, setCaption] = useState('');
  const imageRef = useRef(null); 

  const handleSave = () => {
  };

  const handleDelete = () => {
  };

  const handleFullScreen = () => {
    if (imageRef.current) {
      if (imageRef.current.requestFullscreen) {
        imageRef.current.requestFullscreen();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute -right-5 -top-2 text-3xl text-white transform translate-x-full"
          title="Close"
        >
          &times;
        </button>
        <div className="flex justify-center relative">
          <img 
            ref={imageRef}
            src={image ? URL.createObjectURL(image) : ''} 
            alt="Current" 
            className="max-w-full max-h-[60vh] object-contain my-4"
          />
          <button 
            onClick={handleFullScreen}
            className="absolute top-2 right-2 h-6 w-6"
            title="Full Screen"
          >
            <img src={fullScreenIcon} alt="Full Screen" />
          </button>
        </div>
        <div className="flex justify-center space-x-56 mt-4">
          <button 
            onClick={handleSave}
            className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-color w-36 h-10"
          >
            Restore to Home
          </button>
          <button 
            onClick={handleDelete}
            className="bg-[#FF6666] hover:bg-[#e64a19] text-black rounded-3xl shadow-md transition-color w-36 h-10 text-2xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Soldpopup;
