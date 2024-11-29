import React from 'react';

function PhotoDetails({
  image,
  isStarred,
  caption,
  onClose,
  onEdit,
  onMarkSold,
}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg w-100 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Image and Caption */}
        <img
          src={image}
          alt="Photo details"
          className="max-w-full max-h-[80vh] object-contain rounded-lg mb-4"
        />
        <div className="flex items-center mb-4">
          {isStarred && (
            <span className="text-3xl text-text-c">
              &#9733; {/* Star icon */}
            </span>
          )}
          <p className="text-gray-700 ml-2">{caption}</p>
        </div>

        {/* Edit and Sold Buttons */}
        <div className="flex justify-between">
          <button onClick={onEdit} className="bg-ccBlue px-9 py-3 rounded-[20px] font-medium text-xl">
            Edit
          </button>
          <button onClick={onMarkSold} className="bg-ccBlue px-9 py-3 rounded-[20px] font-medium text-xl">
            Sold
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;
