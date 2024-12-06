import React, { useRef } from 'react';
import exitFullScreenIcon from '../Assets/Icons/Exit_Full_Screen_Corner.png';

function FullScreenView({ img, onClose}) {
  const imageRef = useRef(null);

  const handleExitFullScreen = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[99999]">
      <div className="relative p-10 h-full bg-white rounded-lg"   style={{
                minWidth: '55%', 
                maxHeight: '98%', 
              }}
      >
        {/* Full Screen Popup */}
        <button
            onClick={handleExitFullScreen}
            className="absolute top-8 right-0 h-6 w-6"
            title="Exit Full Screen"
            style={{
                transform: 'translateY(-70%)', 
                transform: 'translateX(-35%)', 
            }}
            >
            <img src={exitFullScreenIcon} alt="Exit Full Screen" />
        </button>
        <div className=" flex justify-center items-center w-full h-full">
            <img
            ref={imageRef}
            src={typeof img === "string" ? img : img.url}
            alt="Full Screen"
            className="object-contain w-full h-full"
            style={{
                maxWidth: '100%',  
                maxHeight: '100%', 
            }}
            />
        </div>

      </div>
      
    </div>
  );
}

export default FullScreenView;