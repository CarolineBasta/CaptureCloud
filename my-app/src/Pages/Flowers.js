import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import folderIcon from '../Assets/Icons/Folder_blue.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import checkIcon from '../Assets/Icons/white_check.png';
import Button from '../UI/button';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';
import ARpopup from '../UI/ARpopup';
import EditPopup from '../UI/EditPopup.js';
import PhotoDetails from '../UI/PhotoDetails.js';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';

import pic1 from '../Assets/Photos/pic1.jpg';
import pic2 from '../Assets/Photos/pic2.jpg';
import pic3 from '../Assets/Photos/pic3.jpeg';
import pic4 from '../Assets/Photos/pic4.jpg';
import pic5 from '../Assets/Photos/pic5.jpg';
import pic6 from '../Assets/Photos/pic6.avif';

function Flowers() {
  useEffect(() => { document.title = 'Albums'; });
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [flowers, setFlowers] = useState([
    { url: pic1, caption: '', tags: ['pink'], isStarred: false },
    { url: pic2, caption: '', tags: [], isStarred: false },
    { url: pic3, caption: '', tags: [], isStarred: false },
    { url: pic4, caption: '', tags: [], isStarred: false },
    { url: pic5, caption: '', tags: [], isStarred: false },
    { url: pic6, caption: '', tags: [], isStarred: false },
  ]);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const [albumName, setAlbumName] = useState('Flowers'); 
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); // Edit popup state

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
    setFlowers((prevImages) =>
      prevImages.map((image, index) =>
        index === selectedImageIndex
          ? { ...image, ...updatedDetails } // Update selected image
          : image
      )
    );
    setShowEditPopup(false); // Close EditPopup
    setShowModal(true); // Reopen the first popup to show updated details
  };
  
  // Delete an image
  const handleDeleteImage = () => {
    setFlowers((prevImages) =>
      prevImages.filter((_, index) => index !== selectedImageIndex)
    );
    setShowEditPopup(false); // Close the EditPopup after deleting
  };

  const handleBackClick = () => {
    navigate('/albums');
  };

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  const handleImageSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleDeleteSelected = () => {
    setValidationVisible(true);
  };
  
  const handleUploadIconClick = () => {
    alert('Under development. Tune back soon!'); 
  }

  const confirmDelete = () => {
    const updatedFlowers = flowers.filter((image) => !selectedImages.includes(image));
    setFlowers(updatedFlowers);
    const currentTrash = JSON.parse(localStorage.getItem('trash')) || [];
    const newTrash = [...currentTrash, ...selectedImages];
    localStorage.setItem('trash', JSON.stringify(newTrash));
    setSelectedImages([]);
    setValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setValidationVisible(false);
  };

  const handleEditAlbumName = () => {
    setIsRenamePopupOpen(true);
  };

  const handleRenameConfirm = (newName) => {
    setAlbumName(newName); 
    setIsRenamePopupOpen(false); 
  };

  const handleRenameClose = () => {
    setIsRenamePopupOpen(false); 
  };

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Albums</h1>

      <div className="flex">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <div className="flex-1 p-6">
          <div className="text-2xl text-left mt-2 ml-10 flex items-center space-x-4">
            <img src={folderIcon} alt="Folder Icon" className="w-9 h-19" />
            <h2 className="text-[#6AABD2]">{albumName}</h2>
            <button className="ml-2" onClick={handleEditAlbumName}>
              <img
                src={editIcon}
                alt="Edit Icon"
                className="w-5 h-5 mt-1 cursor-pointer"
                title="Edit Album"
              />
            </button>
          </div>

          {isRenamePopupOpen && (
            <ARpopup
              onConfirm={handleRenameConfirm} 
              onClose={handleRenameClose}   
            />
          )}

          <div className="fixed top-12 right-40 mt-14 mr-6" title={isSelected ? "Cancel Select" : "Select Photo(s)"}
          >
            <Button
              onClick={handleButtonClick}
              color={isSelected ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9] hover:bg-[#B0B0B0]'}
              className="w-36 h-12"            >
              <span>{isSelected ? 'Cancel' : 'Select'}</span>
            </Button>
          </div>

          {isSelected && selectedImages.length > 0 && (
            <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6">
              <Button
                onClick={handleDeleteSelected}
                color="bg-[#FF6666] hover:bg-[#e64a19]"
                className="w-36 h-12"
              >
                Delete Photos
              </Button>
            </div>
          )}

          <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-12 ml-[95px]">
            {flowers.map((image, index) => (
              <div key={index} className="relative">
                <div
                  onClick={() => isSelected && handleImageSelect(image)}
                  className={`cursor-pointer ${
                    isSelected && selectedImages.includes(image)
                      ? 'border-4 border-yellow-200 rounded-2xl'
                      : 'rounded-2xl'
                  } relative` }
                  style={{
                    width: '12rem',
                    height: '10.5rem',
                  }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isSelected && selectedImages.includes(image) && (
                    <img
                      src={checkIcon}
                      alt="Checkmark"
                      className="absolute top-3 left-40 w-6 h-5 z-10"
                    />
                  )}

                  <img
                    src={image.url}
                    alt={`Flower ${index + 1}`}
                    className={`h-40 w-48 object-cover rounded-2xl shadow-lg ${
                      isSelected && selectedImages.includes(image) ? 'filter brightness-50' : ''
                    }`}
                    style={{
                      marginLeft: '-1px',
                    }}
                  />
                  {hovered === index && !isSelected && (
                  <button
                  onClick={() => handleOpenPhotoDetails(index)}
                  className="bg-[#BDD9E2] font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg text-center w-36 h-10 flex items-center justify-center z-20">
                  Photo Details
                  </button>
              )}
                </div>
              </div>
            ))}
          </div>

        {showModal && selectedImageIndex !== null && (
          <PhotoDetails
            image={flowers[selectedImageIndex]}
            isStarred={flowers[selectedImageIndex].isStarred}
            caption={flowers[selectedImageIndex].caption}
            onClose={() => setShowModal(false)}
            onEdit={handleOpenEditPopup}
            //onMarkSold={() => setShowSoldMessage(true)}
          />
        )}

        {/* EditPopup Component */}
        {showEditPopup && selectedImageIndex !== null && (
          <EditPopup
            image={flowers[selectedImageIndex]}
            onClose={() => setShowEditPopup(false)}
            onSave={handleSaveEdits}
            onDelete={handleDeleteImage}
          />
        )}
        </div>
      </div>

      <div className="fixed left-48 top-20">
        <img
          src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Albums"
          onClick={handleBackClick}
        />
        <img
          src={uploadIcon}
          alt="Uploaded Icon"
          className="fixed top-[220px] right-12 transform -translate-y-5 w-7 h-7 cursor-pointer"
          onClick={handleUploadIconClick}
          title="Upload Photos"
        />
        <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium">
          Total Photos: {flowers.length}
        </div>
      </div>

      {isValidationVisible && (
        <Validation
          title="Delete Photos?"
          message="Are you sure you want to delete the selected photo(s)?"
          button1Text="Cancel"
          button2Text="Delete"
          onBlue={cancelDelete}
          onRed={confirmDelete}
        />
      )}

      {isConfirmationVisible && (
        <Confirmation
          message="Photo(s) successfully deleted."
          onConfirm={() => setConfirmationVisible(false)}
        />
      )}
    </div>
  );
}

export default Flowers;
