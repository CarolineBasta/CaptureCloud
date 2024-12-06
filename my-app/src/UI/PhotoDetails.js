import React, { useState } from 'react';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';
import FullScreen from './FullScreenView';
import albumsIcon from '../Assets/Icons/folder_filled.png';
import locationIcon from '../Assets/Icons/Globe.png';

function PhotoDetails({
  image,
  isStarred,
  caption,
  album,
  location,
  onClose,
  onEdit,
  onMarkSold,
  onPrev, // Changed from 'onPrevious' to 'onPrev'
  onNext,
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };
  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-11 rounded-lg max-w-4xl w-auto mx-4 relative">
        <button onClick={handleFullScreen} className="absolute top-9 right-2 h-6 w-6" title="Full Screen">
          <img src={fullScreenIcon} alt="Full Screen" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev} // Updated from 'onPrevious' to 'onPrev'
          className="absolute left-[-70px] top-1/2 transform -translate-y-1/2 bg-[#ffffff] text-black font-bold rounded-full h-14 w-10 flex items-center justify-center shadow-md hover:bg-[#D9D9D9]"
          title="Previous"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="absolute right-[-70px] top-1/2 transform -translate-y-1/2 bg-[#ffffff] text-black font-bold rounded-full h-14 w-10 flex items-center justify-center shadow-md hover:bg-[#D9D9D9]"
          title="Next"
        >
          &gt;
        </button>

        <div className="relative w-full max-w-[90vw] max-h-[90vh] flex flex-col items-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -right-16 -top-11 text-3xl text-white transform translate-x-full"
            title="Close"
          >
            &times;
          </button>

          {/* Image and Caption */}
          <img
            src={typeof image === 'string' ? image : image.url}
            alt="Details"
            className="max-w-full max-h-[80vh] object-contain rounded-lg mb-4"
          />
        <div className="flex items-center mb-4">
            {isStarred && (
              <span className="text-3xl text-text-c">
                &#9733; {/* Star icon */}
              </span>
            )}
            <p className="text-gray-700 ml-2">{caption}</p>
            
          {album && (
                <div className="flex items-right ml-5">
                  <img 
                    src={albumsIcon} 
                    alt="Albums" 
                    className="mr-2" 
                    style={{ height: '3vh', width: '3vh' }} 
                  />
                  <p className="text-gray-700">{album}</p>
                </div>
            )}

          {location && (
                <div className="flex items-right ml-5">
                  <img 
                    src={locationIcon} 
                    alt="Location" 
                    className="mr-2" 
                    style={{ height: '3vh', width: '3vh' }} 
                  />
                  <p className="text-gray-700">{location}</p>
                </div>
            )}
        </div>

          {/* Edit and Sold Buttons */}
          <div className="flex justify-between w-full">
            <button
              onClick={onEdit}
              className="bg-ccBlue px-9 py-3 rounded-[20px] font-medium text-xl"
            >
              Edit
            </button>
            <button
              onClick={onMarkSold}
              className="bg-ccBlue px-9 py-3 rounded-[20px] font-medium text-xl"
            >
              Sold
            </button>
          </div>
        </div>
      </div>
      {/* Full Screen Popup */}
      {isFullScreen && (
        <FullScreen
          img={image}
          onClose={() => handleExitFullScreen()}
        />
      )}
    </div>
  );
}

export default PhotoDetails;