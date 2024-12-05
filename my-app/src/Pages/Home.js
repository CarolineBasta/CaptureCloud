import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar.js';
import SearchbarHome from '../Layout/SearchbarHome.js';
import logo from '../Assets/Logo/Logo.png';
import EditPopup from '../UI/EditPopup.js';
import PhotoDetails from '../UI/PhotoDetails.js';
import pic1 from '../Assets/Photos/pic1.jpg';
import pic2 from '../Assets/Photos/pic2.jpg';
import pic3 from '../Assets/Photos/pic3.jpeg';
import pic4 from '../Assets/Photos/pic4.jpg';
import pic5 from '../Assets/Photos/pic5.jpg';
import pic6 from '../Assets/Photos/pic6.avif';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';
import UploadCloudIcon from '../Assets/Icons/Upload cloud.png'; 
import checkIcon from '../Assets/Icons/white_check.png'; 
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';

function Home() {
  const [hovered, setHovered] = useState(null); // Hover state for image box
  const [showModal, setShowModal] = useState(false); // Initial popup modal state
  const [showEditPopup, setShowEditPopup] = useState(false); // Edit popup state
  const [showSoldMessage, setShowSoldMessage] = useState(false); // Sold confirmation popup state
  const [isExpanded, setIsExpanded] = useState(false); // Expand state for any additional UI
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Index of the selected image
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); 
  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false); 
  const [isSoldValidationVisible, setSoldValidationVisible] = useState(false);
  const [isSoldConfirmationVisible, setSoldConfirmationVisible] = useState(false); 
  const [newHomeImages, setNewHomeImages] = useState([]);
  const [newSoldToHomeImages, setNewSoldToHomeImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const home = JSON.parse(localStorage.getItem('home')) || [];
    const soldToHome = JSON.parse(localStorage.getItem('soldToHome')) || [];

    document.title = 'Home';

    setNewHomeImages(home);
    setNewSoldToHomeImages(soldToHome)
  }, []);

  // List of hardcoded images
  const [images, setImages] = useState([
    { id: 4, url: pic1, caption: '', tags: ['pink', 'rose'], isStarred: false, album: 'Flowers' },
    { id: 5, url: pic2, caption: '', tags: ['sunflower'], isStarred: false, album: 'Flowers' },
    { id: 6, url: pic3, caption: '', tags: ['rose'], isStarred: false, album: 'Flowers' },
    { id: 7, url: pic4, caption: '', tags: ['sunflower'], isStarred: false, album: 'Flowers' },
    { id: 8, url: pic5, caption: '', tags: ['blue'], isStarred: false, album: 'Flowers' },
    { id: 9, url: pic6, caption: '', tags: ['purple'], isStarred: false, album: 'Flowers' },
    // Add more dummy images as needed
  ]);

  const handleSearchUpdate = (searchTags) => {
    if (searchTags.length === 0) {
      setImages(images);
    } else {
      const filtered = images.filter((image) =>
        searchTags.every(tag => image.tags.includes(tag))
      );
      setImages(filtered);
    }
  };

  // Using the context to get photos from the Upload page
  // Combine hardcoded images and uploaded photos into one list
  const combinedImages = [
    ...images, // Hardcoded images
    ...newHomeImages.map((photo, index) => ({
      id: images.length + index + 1, // Ensure unique IDs
      url: photo,
      caption: '',
      tags: [],
      isStarred: false,
    })), // Uploaded photos
    ...newSoldToHomeImages.map((photo, index) => ({
      id: images.length + newHomeImages.length + index + 1, // Ensure unique IDs
      url: photo.url,
      caption: '',
      tags: [],
      isStarred: false,
    })), // Sold photos
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
    const imageToDelete = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToDelete.id);
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    trash.push(imageToDelete.url);
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    if (updatedImages.length > 0) {
      const nextIndex = selectedImageIndex % updatedImages.length;
      setSelectedImageIndex(nextIndex);
    } else {
      setShowModal(false);
    }

    setConfirmationVisible(true); 
    setShowEditPopup(false); // Close the EditPopup after deleting
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % combinedImages.length;
    setSelectedImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + combinedImages.length) % combinedImages.length;
    setSelectedImageIndex(prevIndex);
  };

  // Handle select/cancel button click
  const handleButtonClick = () => {
    setIsSelected(!isSelected);
    setSelectedImages([]); 
  };

  // Handle image selection
  const handleImageSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  // Handle delete selected images
  const handleDeleteSelected = () => {
    setValidationVisible(true); 
  };

  const handleSold = () => {
    setSoldValidationVisible(true); 
  };



  const confirmDelete = () => {
    const updatedImages = combinedImages.filter((image) => !selectedImages.includes(image.id));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    selectedImages.forEach((id) => {
      const image = combinedImages.find((img) => img.id === id);
      if (image) {
        trash.push(image.url);
      }
    });
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    setSelectedImages([]);
    setValidationVisible(false);
    setConfirmationVisible(true); 
    setIsSelected(false); 
  };

  const cancelDelete = () => {
    setValidationVisible(false); 
  };

  const cancelSold = () => {
    setSoldValidationVisible(false); 
  };

  const confirmSold = () => {
    const imageToRestore = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToRestore.id);
    const homeImages = JSON.parse(localStorage.getItem('sold')) || [];
    homeImages.push(imageToRestore);
    localStorage.setItem('sold', JSON.stringify(homeImages));

    setImages(updatedImages);
    if (updatedImages.length > 0) {
      const nextIndex = selectedImageIndex % updatedImages.length;
      setSelectedImageIndex(nextIndex);
    } else {
      setShowModal(false);
    }

    setSelectedImages([]);
    setSoldValidationVisible(false);
    setSoldConfirmationVisible(true); 
    setIsSelected(false); 
    setShowSoldMessage(false); // Close Sold confirmation
    setShowModal(false);
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

        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">
          Home
        </h1>

        {/* Select/Cancel Button */}
        <div
          className="absolute top-20 right-40 mt-6 mr-6 z-50"
          title={isSelected ? 'Cancel Select' : 'Select Photo(s)'}
        >
          <Button
            onClick={handleButtonClick}
            color={isSelected ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9] hover:bg-[#B0B0B0]'}
            className="fixed w-36 h-12"
          >
            <span>{isSelected ? 'Cancel' : 'Select'}</span>
          </Button>
        </div>
        {isSelected && selectedImages.length > 0 && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6 z-50">
            <Button
              onClick={handleDeleteSelected}
              color="bg-[#FF6666] hover:bg-[#e64a19]"
              className="w-36 h-12"
            >
              Delete Photos
            </Button>
          </div>
        )}

        {/* Searchbar */}
        <div className="mt-4 flex flex-col items-center ml-32">
          <SearchbarHome onSearchUpdate={handleSearchUpdate}  />
          <div className="">
          {images.map((image) => (
          <div key={image.id} className="relative">
          </div>
        ))}
      </div>
        </div>

        {/* Top Tags */}
        <div className="flex flex-row mt-8 items-start justify-center gap-5 ml-32">
          {combinedImages.length > 0 ? (
            <>
              <h2 className="m-1 mt-[-1px] text-xl text-center text-[#016AC7] font-bold">
                Top Tags
              </h2>
              <button className="bg-blueButton-c text-[#016AC7] px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
                &#9733; Favourites
              </button>
              <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                Nature
              </button>
              <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                Summer
              </button>
              <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                Beach
              </button>
              <button className="mb-4 text-xl text-[#016AC7] font-bold" onClick={() => window.location.href = '/all-tags'}> All Tags &#10230;</button>
              {/* <button
                className={`mb-5 text-xl font-bold ${
                  combinedImages.length > 0
                    ? 'text-[#016AC7]'
                    : 'text-gray-500 cursor-not-allowed'
                }`}
                onClick={combinedImages.length > 0 ? () => navigate('/tagslist') : null}
              >
                All Tags &#10230;
              </button> */}
            </>
          ) : (
            <h2 className="m-1 text-xl text-center text-gray-500 font-bold">
              Top Tags
            </h2>
          )}
        </div>

        {combinedImages.length > 0 ? (
          /* Image Boxes */
          <div className="mt-12 grid grid-cols-4 gap-16 ml-[290px] mr-[70px] gap-y-12 mb-20">
            {combinedImages.map((image, index) => (
              <div key={image.id} className="relative group">
                <div
                  onClick={() =>
                    isSelected
                      ? handleImageSelect(image.id)
                      : handleOpenPhotoDetails(index)
                  }
                  onMouseEnter={() => setHovered(index)} //only show this if certain image is hovered on
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-pointer ${
                    isSelected && selectedImages.includes(image.id)
                      ? 'border-4 border-yellow-200 rounded-2xl'
                      : 'rounded-2xl'
                  } transform transition-transform duration-200 ${
                    hovered === index ? 'scale-105' : ''
                  }`}
                  style={{ width: '12rem', height: '10.5rem' }}
                >
                  {isSelected && selectedImages.includes(image.id) && (
                    <img
                      src={checkIcon}
                      alt="Checkmark"
                      className="absolute top-3 left-40 w-6 h-5 z-10"
                    />
                  )}
                  {!isSelected && hovered === index && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPhotoDetails(index);
                      }}
                      className="bg-[#BDD9E2] font-medium p-2 px-4 rounded-full shadow-md focus:outline-none absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
                    >
                      Photo Details
                    </button>
                  )}
                 {/* Image Element */}
                  <img
                    src={image.url}
                    alt={`Preview ${index}`}
                    className="h-40 w-48 object-cover rounded-2xl shadow-lg"
                    style={{ marginLeft: '-1px' }}
                  />
                </div>
              </div>
            ))}


            
          </div>
        ) : (
          /* No Photos Message */
          <div className="flex flex-col items-center justify-center mt-12">
            <p className="text-xl text-center ml-20 text-gray-500 flex items-center">
              No photos available.&nbsp;
              <button
                className="underline text-[#6AABD2]"
                onClick={() => navigate('/upload')}
              >
                Upload photos
              </button>
              <img
                src={UploadCloudIcon}
                alt="Upload Icon"
                className="w-6 h-6 mx-2"
              />
              to start.
            </p>
          </div>
        )}

        {/* Initial Popup Modal */}
        {showModal && selectedImageIndex !== null && (
          <PhotoDetails
            image={combinedImages[selectedImageIndex].url}
            isStarred={combinedImages[selectedImageIndex].isStarred}
            caption={combinedImages[selectedImageIndex].caption}
            onClose={() => setShowModal(false)}
            onEdit={handleOpenEditPopup}
            onMarkSold={handleSold}
            onPrevious={handlePreviousImage}
            onNext={handleNextImage}
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

        {isValidationVisible && (
          <Validation
            title="Move to Trash?"
            message="Are you sure you want to move the selected photo(s) to trash?"
            button1Text="Cancel"
            button2Text="Delete"
            onBlue={cancelDelete}
            onRed={confirmDelete}
            className="z-60"
          />
        )}

        {isSoldValidationVisible && (
          <Validation
            title="Mark as Sold?"
            message="Are you sure you want to mark this photo as sold?"
            button1Text="Cancel"
            button2Text="Sold"
            onBlue={cancelSold}
            onRed={confirmSold}
            className="z-60"
          />
        )}

        {isConfirmationVisible && (
          <Confirmation
            message="Successfully moved to trash."
            onConfirm={() => setConfirmationVisible(false)}
            className="z-60"
          />
        )}

        {isSoldConfirmationVisible && (
          <Confirmation
            message="Successfully moved to the Sold page."
            onConfirm={() => setSoldConfirmationVisible(false)}
            className="z-60"
          />
        )}
      </div>

      {/* Photo Count */}
      <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium">
        <p className="text-black font-small">
          Total Photos: {combinedImages.length}
        </p>
      </div>
    </div>
  );
}

export default Home;