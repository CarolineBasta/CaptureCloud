import React, { useState, useRef } from 'react';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';
import i from '../Assets/Icons/i.png';
import Validation from './Validation';

function EditPopup({ image, onClose, onSave, onDelete }) {
  const [caption, setCaption] = useState(image.caption || '');
  const [tags, setTags] = useState(image.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isStarred, setIsStarred] = useState(image.isStarred || false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const imageRef = useRef(null);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    const updatedDetails = {
      caption, isStarred, tags
    };
    onSave(updatedDetails);
  };

  const handleExitWithoutSaving = () => {
    setShowExitWarning(false);
    onClose();
  };

  const handleFullScreen = () => {
    if (imageRef.current && imageRef.current.requestFullscreen) {
      imageRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowExitWarning(true)}
          className="absolute text-3xl top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        {/* Exit Warning Dialog */}
        {showExitWarning && (
          <Validation
            title="Exit Edit Screen?"
            message="Are you sure you want to exit? Edits will not be saved."
            onBlue={() => setShowExitWarning(false)} // Resume editing
            onRed={handleExitWithoutSaving} // Exit without saving
            button1Text="Resume Edit"
            button2Text="Exit"
          />
        )}

        {/* Image Preview */}
        <div className="relative">
          <img
            ref={imageRef}
            src={image.url}
            alt="Edit Image"
            className="w-full rounded-lg mb-5"
          />
          <button onClick={handleFullScreen} className="absolute top-2 left-2 h-6 w-6" title="Full Screen">
            <img src={fullScreenIcon} alt="Full Screen" />
          </button>
        </div>

        {/* Star Image */}
        <div className="mb-2 flex items-center justify-between">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`text-3xl ${isStarred ? 'text-text-c' : 'text-gray-400'}`}
          >
            &#9733; {/* Star icon */}
          </button>

          {/* Album Label and Dropdown */}
          <form className="max-w-sm flex items-center space-x-2 m-3">
            <label htmlFor="albums" className="text-gray-700 font-medium mt-1">
              Album
            </label>
            <select
              id="albums"
              className="border-2 text-gray-500 italic rounded-full px-4 py-2 border-text-c"
            >
              <option value="" disabled selected>
                Select an Album
              </option>
              <option value="2020">2020</option>
              <option value="CA">Canada</option>
              <option value="CAT">Cats</option>
              <option value="OU">Outdoors</option>
            </select>
          </form>
        </div>

        {/* Tags and Caption Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Edit Caption
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border-2 text-gray-500 italic text-c rounded-full p-1 border-text-c"
            placeholder="Enter a caption, 60 characters max"
          />
        </div>

        {/* Tags Input */}
        <label className="block text-gray-700 font-medium">
          Add Tags
        </label>
        <div className="flex items-center mb-4">
          <input
            className="w-full border-2 text-gray-500 italic text-c rounded-full p-1 border-text-c"
            placeholder="Add tags..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            onClick={handleAddTag}
            className="text-l ml-1 bg-text-c font-medium text-white px-3 py-1.5 rounded-full"
          >
            Add
          </button>
        </div>

        {/* Tags List */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blueButton-c text-blue-800 px-2 py-1 rounded-lg flex items-center"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-black"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Save and Delete Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-[#BDD9E2] px-4 py-2 rounded-full font-medium"
          >
            Save Edits
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 px-4 py-2 rounded-full text-white font-medium"
          >
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;