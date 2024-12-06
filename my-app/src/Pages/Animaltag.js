import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';

function Animaltag() {
  const [hovered, setHovered] = useState(null);

  const images = [
    {
      url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      caption: '',
      tags: ['cat'],
      isStarred: false,
    },
    {
      url: 'https://images.unsplash.com/photo-1442522772768-9032b6d10e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: '',
      tags: ['fox'],
      isStarred: false,
    },
    {
      url: 'https://wallpapershome.com/images/pages/pic_h/1055.jpg',
      caption: '',
      tags: ['nature', 'water'],
      isStarred: false,
    }
  ];

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex-1">
        {/* Logo */}
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="w-32 ml-32" />
        </div>

        {/* Title */}
        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Home</h1>

        {/* Searchbar and Button */}
        <div className="relative mt-4 flex items-center justify-center ml-32">
          <button
            className="absolute bg-[#CEECF5] text-blue-800 px-3 py-0.5 rounded-full z-10 flex items-center justify-between"
            style={{ left: '37%' }} 
          >
            <span>Animals</span>
            <button
              onClick={() => console.log('X button clicked')}
              className="text-blue-800 ml-2 text-sm rounded-full hover:text-red-500 focus:outline-none"
              aria-label="Close"
            >
              x
            </button>
          </button>
          <Searchbar className="z-0 ml-32 w-80" /> {/* Searchbar with `ml-32` */}
        </div>

        {/* Images */}
        <div className="flex flex-row mt-8 items-start justify-center gap-10 ml-32">
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

export default Animaltag;
