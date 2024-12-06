import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';

function Skytag() {
  const [hovered, setHovered] = useState(null);

  const images = [
    {
      url: 'https://static.vecteezy.com/system/resources/previews/024/892/056/non_2x/vibrant-sunset-sky-over-idyllic-landscape-a-moody-backdrop-generated-by-ai-free-photo.jpg',
      caption: '',
      tags: ['sky'],
      isStarred: false,
    },
    {
      url: 'https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: '',
      tags: ['sky'],
      isStarred: false,
    },
    {
      url: 'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: '',
      tags: ['sky'],
      isStarred: false,
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex-1">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6">Sold Photos</h1>

        <div className="relative mt-4 flex items-center justify-center">
          {/* Sky button with X */}
          <button 
            className="absolute bg-[#CEECF5] text-blue-800 px-3 py-0.5 rounded-full z-10 flex items-center justify-between"
          >
            <span>Sky</span>
            <button 
              onClick={() => console.log('X button clicked')} 
              className="text-blue-800 ml-2 text-sm rounded-full hover:text-red-500 focus:outline-none"
              aria-label="Close"
            >
              x
            </button>
          </button>

          {/* Searchbar */}
          <Searchbar className="z-0" />
        </div>



        <div className="flex flex-row mt-8 items-start justify-center gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-52 h-48 rounded-lg transform transition-transform duration-200 ${hovered === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={image.url}
                alt={`Preview ${index}`}
                className="relative w-full h-full rounded-lg object-cover transform transition-transform duration-200"
              />
              {hovered === index && (
                <button
                  onClick={() => console.log(`Clicked on image ${index}`)}
                  className="bg-[#BDD9E2] font-medium p-2 px-4 rounded-full shadow-md focus:outline-none absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
                >
                  Photo Details
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skytag;
