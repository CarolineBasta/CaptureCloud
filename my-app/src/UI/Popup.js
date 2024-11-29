import React, { useState, useRef } from 'react';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';

function Popup({ isOpen, handleClose, image, metadata, onDelete, onSave }) {
  const [tags, setTags] = useState(metadata?.tags || []);
  const [caption, setCaption] = useState(metadata?.caption || '');
  const [isStarClicked, setIsStarClicked] = useState(metadata?.isStarClicked || false);
  const imageRef = useRef(null);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFullScreen = () => {
    if (imageRef.current && imageRef.current.requestFullscreen) {
      imageRef.current.requestFullscreen();
    }
  };

  const handleSave = () => {
    onSave(image, { tags, caption, isStarClicked });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 relative">
        <button onClick={handleClose} className="absolute -right-5 -top-2 text-3xl text-white transform translate-x-full" title="Close">
          &times;
        </button>
        <div className="flex justify-center relative">
          <img ref={imageRef} src={image ? URL.createObjectURL(image) : ''} alt="Current" className="max-w-full max-h-[50vh] object-contain my-4" />
          <button onClick={handleFullScreen} className="absolute top-2 right-2 h-6 w-6" title="Full Screen">
            <img src={fullScreenIcon} alt="Full Screen" />
          </button>
        </div>
        
        {/* Tags Input */}
        <div className="flex items-center mb-4">
          <label className="block text-gray-700 font-medium mr-3">Add Tags</label>
          <input
            className="w-3/4 border-2 text-gray-500 italic text-c rounded-full px-3 py-2 focus:outline-none border-text-c"
            placeholder="Add tags..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            onClick={handleAddTag}
            className="text-sm ml-1 bg-text-c font-medium text-white px-3 py-1 rounded-full"
          >
            Add
          </button>
        </div>
        

        <div className="flex items-center mt-2">
          <button onClick={() => setIsStarClicked(!isStarClicked)} className={`text-3xl ${isStarClicked ? 'text-text-c' : 'text-gray-400'}`}>&#9733;</button>
          <div className="flex flex-wrap gap-2 ml-4">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blueButton-c text-blue-800 px-2 py-1 rounded-lg flex items-center">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-black-600">&times;</button>
              </span>
            ))}
          </div>
        </div>
  
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-[#6AABD2] rounded-3xl shadow-lg focus:outline-none sm:text-sm"
            placeholder="Add caption. 60 characters max..."
            maxLength="60"
          />
        </div>
        
        <div className="flex justify-center space-x-32 mt-8">
          <button onClick={handleSave} className="text-black rounded-3xl shadow-md bg-[#B1DEA5] hover:bg-[#8CBF7B] transition-color w-32 h-10">Save</button>
          <button onClick={() => onDelete(image)} className="bg-[#FF6666] hover:bg-[#e64a19] text-black rounded-3xl shadow-md transition-color w-32 h-10">Delete Photo</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
