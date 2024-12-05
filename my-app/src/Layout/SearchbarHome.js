import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/Icons/search_icon.png';
import xIcon from '../Assets/Icons/X.png';

function SearchbarHome({ onSearchUpdate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const uniqueTags = ['pink', 'rose', 'sunflower', 'blue', 'purple']; // Example list of unique tags

  const handleSearchChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    if (input.endsWith(' ')) {
      const tagToAdd = input.trim();
      if (uniqueTags.includes(tagToAdd) && !selectedTags.includes(tagToAdd)) {
        setSelectedTags([...selectedTags, tagToAdd]);
        onSearchUpdate([...selectedTags, tagToAdd]); // Pass updated tags
      }
      setSearchTerm('');
    } else {
      setFilteredTags(uniqueTags.filter(tag => tag.toLowerCase().startsWith(input.toLowerCase())));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    onSearchUpdate(updatedTags); // Pass updated tags
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedTags([]);
    onSearchUpdate([]); // Clear search in Home
  };

  const handleTagSelect = (tagToAdd) => {
    if (!selectedTags.includes(tagToAdd)) {
      const updatedTags = [...selectedTags, tagToAdd];
      setSelectedTags(updatedTags);
      onSearchUpdate(updatedTags); // Pass updated tags
    }
    setSearchTerm('');
    setFilteredTags([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-96">
        <div className="flex items-center h-8 border-2 border-text-c rounded-full px-3">
          <span className="text-gray-400 mr-2 flex-shrink-0">
            <img src={searchIcon} alt="Search Icon" className="w-4 h-4" />
          </span>
          <div className="flex items-center flex-grow overflow-hidden">
            <div className="flex space-x-2 h-6">
              {selectedTags.map((tag, index) => (
                <span key={index} className="bg-[#CEECF5] text-blue-800 px-2 py-1 rounded-full flex items-center flex-shrink-0">
                  {tag}
                  <button onClick={() => handleTagRemove(tag)} className="ml-1 text-blue-600">
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder={selectedTags.length === 0 ? "Search tags..." : ""}
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow border-none focus:outline-none text-gray-500 min-w-16"
            />
          </div>
          <button onClick={handleClearSearch} className="text-gray-400 ml-2 flex-shrink-0" title="Clear search">
            <img src={xIcon} alt="X Icon" className="w-4 h-4" />
          </button>
        </div>
        {searchTerm && (
          <ul className="absolute left-0 right-0 border-2 mt-1 bg-white border-text-c rounded-lg shadow-md max-h-40 overflow-y-auto z-50">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag, index) => (
                <li key={index} onClick={() => handleTagSelect(tag)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {tag}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No tags found</li>
            )}
            <Link to="/all-tags">
              <li className="px-4 py-2 text-blue-500 cursor-pointer hover:bg-gray-100">View all tags...</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchbarHome;
