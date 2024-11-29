import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';
import EditPopup from '../UI/EditPopup.js';
import InfoIcon from '../Assets/Icons/Info icon.png';
import PhotoDetails from '../UI/PhotoDetails.js';
import { usePhotoContext } from './PhotoContext'; // Importing the PhotoContext

function Home() {
  const [hovered, setHovered] = useState(false); // Hover state for image box
  const [showModal, setShowModal] = useState(false); // Initial popup modal state
  const [showEditPopup, setShowEditPopup] = useState(false); // Edit popup state
  const [showSoldMessage, setShowSoldMessage] = useState(false); // Sold confirmation popup state
  const [isExpanded, setIsExpanded] = useState(false); // Expand state for any additional UI
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Index of the selected image
  
  
  useEffect(() => {document.title = 'Home';});
    
  // list of hardcoded images
  const [images, setImages] = useState([
    {
      url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      caption: '',
      tags: ['cat'],
      isStarred: false,
    },
    {
      url: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
      caption: '',
      tags: ['nature'],
      isStarred: false,
    },
    {
      url: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
      caption: '',
      tags: ['nature', 'water'],
      isStarred: false,
    },
    // Add more dummy images as needed
  ]);

  // Using the context to get photos from the Upload page
  const { photos } = usePhotoContext();
  // Combine hardcoded images and uploaded photos into one list
  const combinedImages = [
    ...images, // Hardcoded images
    ...photos.map((photo) => ({ url: URL.createObjectURL(photo), caption: '', tags: [], isStarred: false })), // Uploaded photos
  ];
  
  // Open the first popup (Photo Details)
  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  // Open the EditPopup
  const handleOpenEditPopup = () => {
    setShowModal(false); // Close the first popup
    setShowEditPopup(true); // Open EditPopup
  };

  // Save edits from the EditPopup
  const handleSaveEdits = (updatedDetails) => {
    setImages((prevImages) =>
      prevImages.map((image, index) =>
        index === selectedImageIndex
          ? { ...image, ...updatedDetails } // Update selected image
          : image
      )
    );
    setShowEditPopup(false); // Close EditPopup
    setShowModal(true); // Reopen the first popup to show updated details
  };

  // Handle marking a photo as sold
  const handleSoldPopup = () => {
    //move to sold - doesnt do anything for now
    setShowSoldMessage(false); // Close Sold confirmation
    setShowModal(false); // Close modal since the image is removed
  };

  // Delete an image
  const handleDeleteImage = () => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== selectedImageIndex));
    setShowEditPopup(false); // Close the EditPopup after deleting
  };
  
  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        {/* Header Section */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
        </div>

        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Home</h1>

        {/* Searchbar */}
        <div className="mt-4 flex flex-col items-center ml-32">
          <Searchbar />
        </div>

        {/* Top Tags - HARDCODEDDDD FIX THISS */}
        <div className="flex flex-row mt-8 items-start justify-center gap-5">
          <h2 className="m-1 text-xl text-center text-[#016AC7] font-bold">Top Tags</h2>
          <button className="bg-blueButton-c text-[#016AC7] px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
            &#9733; Favourites
          </button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Nature</button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Summer</button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Beach</button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Animal</button>
          <button className="mb-4 text-xl text-[#016AC7] font-bold">All Tags &#10230;</button>
        </div>

        {/* Image Boxes */}
        <div className="mt-12 grid grid-cols-4 gap-16 ml-[240px] mr-[70px] gap-y-12 mb-20">
          {combinedImages.map((image, index) => (
            <div
              key={index}
              className={`relative w-52 h-48 rounded-lg transform transition-transform duration-200 ${
                hovered === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHovered(index)} //only show this if certain image is hovered on
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image Element */}
              <img
                src={image.url}
                alt={`Preview ${index}`} //with index now
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              {hovered === index && (
                <button
                  onClick={() => handleOpenPhotoDetails(index)} // Show the initial popup
                  className="bg-[#BDD9E2] font-medium p-2 px-4 rounded-full shadow-md focus:outline-none absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
                >
                  Photo Details
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Initial Popup Modal */}
        {showModal && selectedImageIndex !== null && (
          <PhotoDetails
            image={combinedImages[selectedImageIndex].url}
            isStarred={combinedImages[selectedImageIndex].isStarred}
            caption={combinedImages[selectedImageIndex].caption}
            onClose={() => setShowModal(false)}
            onEdit={handleOpenEditPopup}
            //onMarkSold={() => setShowSoldMessage(true)}
          />
        )}
        {/* EditPopup Component */}
        {showEditPopup && selectedImageIndex !== null && (
          <EditPopup
            image={combinedImages[selectedImageIndex]}
            onClose={() => setShowEditPopup(false)}
            onSave={handleSaveEdits}
            onDelete={handleDeleteImage}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
