import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';

function Animaltag() {
  const [hovered, setHovered] = useState(null);
  const images = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1442522772768-9032b6d10e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      url: 'https://wallpapershome.com/images/pages/pic_h/1055.jpg',
    },
    {
      id: 4,
      url: 'https://cdn.britannica.com/94/494-050-A674AD3A/Fallow-deer.jpg',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex-1">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="w-32 ml-32" />
        </div>

        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Home</h1>

        <div className="relative mt-4 flex items-center justify-center ml-32">
          <button
            className="absolute bg-[#CEECF5] text-blue-800 px-3 py-0.5 rounded-full z-10 flex items-center justify-between"
            style={{ left: '36.5%' }}
          >
            <span>Animal</span>
            <button
              onClick={() => console.log('X button clicked')}
              className="text-blue-800 ml-2 text-sm rounded-full hover:text-red-500 focus:outline-none"
              aria-label="Close"
            >
              x
            </button>
          </button>
          <Searchbar className="z-0 ml-32 w-80" placeholder="Search by tag..." />
        </div>

        <div className="flex flex-row flex-wrap mt-8 items-start justify-center gap-10 ml-32">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`cursor-pointer rounded-2xl transform transition-transform duration-200 ${
                hovered === index ? 'scale-105' : ''
              }`}
              style={{ width: '12rem', height: '10.5rem' }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={image.url}
                alt={`Image ${image.id}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Animaltag;
