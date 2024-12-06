import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';

function AllTags() {
  const tags = ['Animal', 'Bear', 'Campus', 'Cloud', 'Garden', 'Nature', 'Red', 'Sunset', 'Wedding'];

  const handleTagClick = (tag) => {
    if (tag === 'Animal') {
      window.location.href = '/animaltag'; // Navigate to the AnimalTag page
    } else {
      console.log(`Clicked on tag: ${tag}`);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex justify-center mt-2">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>

      <div className="flex flex-col items-center justify-center w-full p-8 mt-2">
        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] ml-32">
          Tags
        </h1>

        <div className="grid grid-cols-4 gap-10 text-lg font-medium text-black text-center font-[Anek Bangla] ml-32">
          {tags.sort().map((tag, index) => (
            <div key={index}>
              <span
                className="underline text-black hover:text-[#6AABD2] cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllTags;