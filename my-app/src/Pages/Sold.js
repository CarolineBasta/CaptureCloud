import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import Searchbar from '../Layout/Searchbar.js';
import pic1 from '../Assets/Photos/mapPic3.jpg';
import pic2 from '../Assets/Photos/mapPic5.jpg';
import pic3 from '../Assets/Photos/mapPic24.jpg';
import pic4 from '../Assets/Photos/mapPic29.jpg';
import pic5 from '../Assets/Photos/mapPic27.jpg';
import checkIcon from '../Assets/Icons/white_check.png';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';
import RestoreValidation from '../UI/RestoreValidation.js';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';
import { useNavigate } from 'react-router-dom';

function Sold() {
  const [newSoldImages, setNewSoldImages] = useState([]);

  useEffect(() => {
    const sold = JSON.parse(localStorage.getItem('sold')) || [];
    document.title = 'Sold Photos';
    setNewSoldImages(sold);
  }, []);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const [actionType, setActionType] = useState(null);
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
      caption: '',
      tags: ['paris', 'nature'],
      isStarred: false,
    },
    {
      id: 2,
      url: 'https://www.planetware.com/wpimages/2022/05/canada-pictures-beautiful-places-to-photograph-lake-louise-summer.jpg',
      caption: '',
      tags: ['nature'],
      isStarred: false,
    },
    {
      id: 3,
      url: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
      caption: '',
      tags: ['animals', 'water'],
      isStarred: false,
    },
    { id: 4, url: pic1, caption: '', tags: ['pink'], isStarred: false, album: '' },
    { id: 5, url: pic2, caption: '', tags: [], isStarred: false, album: '' },
    { id: 6, url: pic3, caption: '', tags: [], isStarred: false, album: '' },
    { id: 7, url: pic4, caption: '', tags: [], isStarred: false, album: '' },
    { id: 8, url: pic5, caption: '', tags: [], isStarred: false, album: '' },
  ]);

  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isDeleteValidationVisible, setDeleteValidationVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [isRestoreValidationVisible, setRestoreValidationVisible] = useState(false);
  const [isRestoreConfirmationVisible, setRestoreConfirmationVisible] = useState(false);

  const combinedImages = [
    ...images, // Hardcoded images
    ...newSoldImages.map((photo, index) => ({
      id: images.length + index + 1, // Ensure unique IDs
      url: photo.url,
      caption: '',
      tags: [],
      isStarred: false,
    })), // Uploaded photos
  ];

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
    setSelectedImages([]);
  };

  const handleImageSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelected = () => {
    setValidationVisible(true);
    setActionType('delete');
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
    setIsSelected(false);
    setValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setValidationVisible(false);
  };

  const handleRestoreSelected = () => {
    setRestoreValidationVisible(true);
    setActionType('restore');
  };

  const confirmRestoreSelected = () => {
    const updatedImages = combinedImages.filter((image) => !selectedImages.includes(image.id));
    const homeImages = JSON.parse(localStorage.getItem('soldToHome')) || [];
    selectedImages.forEach((id) => {
      const image = combinedImages.find((img) => img.id === id);
      if (image) {
        homeImages.push(image);
      }
    });
    localStorage.setItem('soldToHome', JSON.stringify(homeImages));

    setImages(updatedImages);
    setSelectedImages([]);
    setIsSelected(false);
    setRestoreValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelRestoreSelected = () => {
    setRestoreValidationVisible(false);
  };

  const handleDeleteImage = () => {
    setDeleteValidationVisible(true);
  };

  const confirmDeleteImage = () => {
    const imageToDelete = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToDelete.id);
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    trash.push(imageToDelete.url);
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    if (updatedImages.length > 0) {
      const nextIndex = selectedImageIndex % updatedImages.length;
      setSelectedImageIndex(nextIndex);
      setCurrentImage(updatedImages[nextIndex]);
    } else {
      setShowModal(false);
    }
    setDeleteValidationVisible(false);
    setDeleteConfirmationVisible(true);
  };

  const cancelDeleteImage = () => {
    setDeleteValidationVisible(false);
  };

  const handleRestoreImage = () => {
    setRestoreValidationVisible(true);
    setActionType('restoreSingle');
  };

  const confirmRestoreImage = () => {
    const imageToRestore = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToRestore.id);
    const homeImages = JSON.parse(localStorage.getItem('soldToHome')) || [];
    homeImages.push(imageToRestore);
    localStorage.setItem('soldToHome', JSON.stringify(homeImages));

    setImages(updatedImages);
    if (updatedImages.length > 0) {
      const nextIndex = selectedImageIndex % updatedImages.length;
      setSelectedImageIndex(nextIndex);
      setCurrentImage(updatedImages[nextIndex]);
    }
    setShowModal(false);
    setRestoreValidationVisible(false);
    setRestoreConfirmationVisible(true);
  };

  const cancelRestoreImage = () => {
    setRestoreValidationVisible(false);
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % combinedImages.length;
    setSelectedImageIndex(nextIndex);
    setCurrentImage(combinedImages[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + combinedImages.length) % combinedImages.length;
    setSelectedImageIndex(prevIndex);
    setCurrentImage(combinedImages[prevIndex]);
  };

  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setCurrentImage(combinedImages[index]);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <div className="fixed">
        <Navbar />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Sold Photos</h1>
      <div
        className="absolute top-20 right-40 mt-6 mr-6 z-10"
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
        <>
          <div className="fixed bottom-16 left-1/2 transform -translate-x-40 z-50">
            <Button
              onClick={handleRestoreSelected}
              color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
              className="w-36 h-12"
            >
              Restore to Home
            </Button>
          </div>

          <div className="fixed bottom-16 right-1/2 transform translate-x-20 z-50">
            <Button
              onClick={handleDeleteSelected}
              color="bg-[#FF6666] hover:bg-[#e64a19]"
              className="w-36 h-12"
            >
              Delete Photos
            </Button>
          </div>
        </>
      )}

      <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium z-50">
        <p className="text-black font-small">Total Photos: {combinedImages.length + newSoldImages.length}</p>
      </div>

      {/* Searchbar */}
      <div className="mt-4 flex flex-col items-center ml-32">
        <Searchbar />
      </div>

      {/* Top Tags */}
      <div className="flex flex-row mt-8 items-start justify-center gap-5">
        <h2 className="m-1 text-xl text-center text-[#016AC7] font-bold">Top Tags</h2>
        <button className="bg-blueButton-c text-[#016AC7] px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
          &#9733; Favourites
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Paris
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Birds
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Historical
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Buildings
        </button>
        <button
          className="mb-4 text-xl text-[#016AC7] font-bold"
          onClick={() => navigate('/tagslist')}
        >
          All Tags &#10230;
        </button>
      </div>

      {/* Image Boxes */}
      <div className="mt-12 grid grid-cols-4 gap-16 ml-[290px] mr-[70px] gap-y-12">
        {combinedImages.map((image, index) => (
          <div key={image.id} className="relative group">
            <div
              onClick={() => (isSelected ? handleImageSelect(image.id) : handleOpenPhotoDetails(index))}
              onMouseEnter={() => setHovered(index)}
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
                <img
                  src={fullScreenIcon}
                  alt="Expand"
                  title="Fullscreen"
                  className="absolute top-2 left-2 w-8 h-8 opacity-100 transition-opacity duration-200"
                />
              )}
              <img
                src={image ? image.url : ''}
                alt={`Preview ${index}`}
                className="h-40 w-48 object-cover rounded-2xl shadow-lg"
                style={{ marginLeft: '-1px' }}
              />
            </div>
          </div>
        ))}

      </div>

      {showModal && currentImage && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="p-4 ml-[50px] rounded-lg relative">
              <button
                className="absolute top-2 -right-8 text-3xl text-white"
                title="Close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <img
                src={currentImage.url}
                alt="Expanded"
                className="max-w-full max-h-[80vh] object-contain"
              />
              <button
                className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#ffffff] text-black font-bold rounded-full h-14 w-10 flex items-center justify-center shadow-md hover:bg-[#D9D9D9]"
                onClick={handlePreviousImage}
                title="Previous"
              >
                &lt;
              </button>
              <button
                className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#ffffff] text-black font-bold rounded-full h-14 w-10 flex items-center justify-center shadow-md hover:bg-[#D9D9D9]"
                onClick={handleNextImage}
                title="Next"
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="fixed bottom-16 left-1/2 transform -translate-x-40 z-20">
            <Button
              onClick={handleRestoreImage}
              color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
              className="w-36 h-12"
            >
              Restore to Home
            </Button>
          </div>

          <div className="fixed bottom-16 right-1/2 transform translate-x-20 z-20">
            <Button
              onClick={handleDeleteImage}
              color="bg-[#FF6666] hover:bg-[#e64a19]"
              className="w-36 h-12"
            >
              Delete
            </Button>
          </div>
        </>
      )}

      <div style={{ backgroundColor: '#FFFFFF' }} className="h-16"></div> 

      {isValidationVisible && !showModal && actionType === 'delete' && (
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

      {isConfirmationVisible && actionType === 'delete' && (
        <Confirmation
          message="Successfully moved to trash."
          onConfirm={() => setConfirmationVisible(false)}
          className="z-60"
        />
      )}

      {isRestoreValidationVisible && !showModal && actionType === 'restore' && (
        <RestoreValidation
          title="Restore Selected Photos?"
          message="Are you sure you want to restore the selected photo(s) to Home Page?"
          button1Text="Restore"
          button2Text="Cancel"
          onBlue={cancelRestoreSelected}
          onGreen={confirmRestoreSelected}
          className="z-60"
        />
      )}

      {isConfirmationVisible && actionType === 'restore' && (
        <Confirmation
          message="Successfully restored to Home Page."
          onConfirm={() => setConfirmationVisible(false)}
          className="z-60"
        />
      )}

      {isDeleteValidationVisible && showModal && (
        <Validation
          title="Move to Trash?"
          message="Are you sure you want to move this photo to trash?"
          button1Text="Cancel"
          button2Text="Delete"
          onBlue={cancelDeleteImage}
          onRed={confirmDeleteImage}
          className="z-60"
        />
      )}

      {isDeleteConfirmationVisible && (
        <Confirmation
          message="Successfully moved to trash."
          onConfirm={() => setDeleteConfirmationVisible(false)}
          className="z-60"
        />
      )}

      {isRestoreValidationVisible && showModal && actionType === 'restoreSingle' && (
        <RestoreValidation
          title="Restore Photo?"
          message="Are you sure you want to restore this photo to Home Page?"
          button1Text="Restore"
          button2Text="Cancel"
          onBlue={cancelRestoreImage}
          onGreen={confirmRestoreImage}
          className="z-60"
        />
      )}

      {isRestoreConfirmationVisible && (
        <Confirmation
          message="Successfully restored to Home Page."
          onConfirm={() => setRestoreConfirmationVisible(false)}
          className="z-60"
        />
      )}
    </div>
  );
}

export default Sold;
  