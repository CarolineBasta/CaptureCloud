import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';

function Animaltag() {
  const [hovered, setHovered] = useState(null); // Hover state for image box

  // List of images
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
      {/* Navbar */}
      <div className="fixed">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header Section */}
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        <h1 className="text-5xl font-medium text-center mb-3 text-text-c mt-6">Home</h1>

        {/* Searchbar with Overlapping Button */}
        <div className="relative mt-4 flex flex-col items-center">
          {/* Overlapping Button */}
          <button 
            className="absolute top-[3px] left-[480px] bg-blueButton-c text-[#016AC7] px-2 py-0.5 rounded-full flex items-center z-10"
          >
            Animal
          </button>
          {/* Searchbar */}
          <Searchbar />
        </div>

        {/* Image Boxes */}
        <div className="flex flex-row mt-8 items-start justify-center gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-52 h-48 rounded-lg transform transition-transform duration-200 ${
                hovered === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHovered(index)} // Hover effect
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image Element */}
              <img
                src={image.url}
                alt={`Preview ${index}`}
                className="relative w-full h-full rounded-lg object-cover transform transition-transform duration-200"
              />
              {hovered === index && (
                <button
                  onClick={() => console.log(`Clicked on image ${index}`)} // Example action for clicked image
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
