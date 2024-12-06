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
import pic7 from '../Assets/Photos/mapPic2.avif';
import pic8 from '../Assets/Photos/mapPic6.webp';
import pic9 from '../Assets/Photos/mapPic14.jpg';
import pic10 from '../Assets/Photos/mapPic30.jpg';
import pic11 from '../Assets/Photos/mapPic12.jpg';
import pic12 from '../Assets/Photos/mapPic16.jpg';
import pic13 from '../Assets/Photos/mapPic15.jpg';
import pic14 from '../Assets/Photos/mapPic25.webp';
import pic15 from '../Assets/Photos/mapPic21.webp';
import pic16 from '../Assets/Photos/mapPic26.jpg';
import pic17 from '../Assets/Photos/mapPic13.webp';
import pic18 from '../Assets/Photos/mapPic22.jpeg';
import pic19 from '../Assets/Photos/mapPic7.webp';
import pic20 from '../Assets/Photos/mapPic23.jpg';
import pic21 from '../Assets/Photos/mapPic19.jpg';
import Button from '../UI/button';
import { useNavigate } from 'react-router-dom';
import UploadCloudIcon from '../Assets/Icons/Upload cloud.png'; 
import checkIcon from '../Assets/Icons/white_check.png'; 
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';
import RestoreValidation from '../UI/RestoreValidation.js';


function Home() {
  const [combinedImages, setCombinedImages] = useState([]);

  // List of hardcoded images
  const [images] = useState([
    { id: 1, url: pic1, caption: '', tags: ['pink', 'rose'], isStarred: false, album: 'Flowers', location: '' },
    { id: 2, url: pic2, caption: '', tags: ['sunflower'], isStarred: false, album: 'Flowers', location: '' },
    { id: 3, url: pic3, caption: '', tags: ['rose'], isStarred: false, album: 'Flowers', location: ''  },
    { id: 4, url: pic4, caption: '', tags: ['sunflower'], isStarred: false, album: 'Flowers', location: ''  },
    { id: 5, url: pic5, caption: '', tags: ['blue'], isStarred: false, album: 'Flowers', location: ''  },
    { id: 6, url: pic6, caption: '', tags: ['purple'], isStarred: false, album: 'Flowers', location: ''  },
    { id: 7, url: pic7, caption: '', tags: ['street'], isStarred: false, album: '', location: ''  },
    { id: 8, url: pic8, caption: '', tags: ['pyramid'], isStarred: false, album: '', location: ''  },
    { id: 9, url: pic9, caption: '', tags: ['mountain'], isStarred: false, album: '', location: ''  },
    { id: 10, url: pic10, caption: '', tags: [''], isStarred: false, album: '', location: ''  },
    { id: 11, url: pic11, caption: '', tags: ['blue'], isStarred: false, album: '' , location: '' },
    { id: 12, url: pic12, caption: '', tags: ['lake'], isStarred: false, album: '', location: ''  },
    { id: 13, url: pic13, caption: '', tags: ['car', 'animals'], isStarred: false, album: '', location: ''  },
    { id: 14, url: pic14, caption: '', tags: ['day'], isStarred: false, album: '', location: ''  },
    { id: 15, url: pic15, caption: '', tags: ['street'], isStarred: false, album: '', location: ''  },
    { id: 16, url: pic16, caption: '', tags: ['night'], isStarred: false, album: '', location: ''  },
    { id: 17, url: pic17, caption: '', tags: ['night'], isStarred: false, album: '', location: ''  },
    { id: 18, url: pic18, caption: '', tags: ['trees'], isStarred: false, album: '', location: ''  },
    { id: 19, url: pic19, caption: '', tags: ['building'], isStarred: false, album: '', location: ''  },
    { id: 20, url: pic20, caption: '', tags: ['street'], isStarred: false, album: '', location: ''  },
    { id: 21, url: pic21, caption: '', tags: ['street'], isStarred: false, album: '', location: ''  },
    // Add more dummy images as needed
  ]);

  useEffect(() => {
    const home = JSON.parse(localStorage.getItem('home')) || [];  // Get images from local storage
    document.title = 'Home';

    // Combine hardcoded images and uploaded photos into one list
    const allImages = [
        ...images, // Hardcoded images
        ...home.map((photo, index) => ({
          id: images.length + index + 1, // Ensure unique IDs
          url: photo,
          caption: '',
          tags: [],
          isStarred: false,
        })), // Sold and Uploaded photos
    ];
    setCombinedImages(allImages);   // Set the list of combined images to the combinedImages variable

    // Display the "Photos uploaded sucessfully" popup if photos have just been uploaded
    const isUploaded = JSON.parse(localStorage.getItem('isUploaded'));  // Get information from Upload page regarding if photos have been uploaded
    if (isUploaded) {   
      setUploadConfirmationVisible(true);   // Display "Photos uploaded sucessfully" popup
    }
  }, [images]);

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
  const [isUploadConfirmationVisible, setUploadConfirmationVisible] = useState(false); 
  const navigate = useNavigate();


  const handleSearchUpdate = (searchTags) => {
    if (searchTags.length === 0) {
      setCombinedImages(images);
    } else {
      const filtered = combinedImages.filter((image) =>
        searchTags.every(tag => image.tags.includes(tag))
      );
      setCombinedImages(filtered);
    }
  };  

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
    setCombinedImages((prevImages) =>
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

    setCombinedImages(updatedImages);
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

    setCombinedImages(updatedImages);
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
    homeImages.push(imageToRestore.url);
    localStorage.setItem('sold', JSON.stringify(homeImages));

    setCombinedImages(updatedImages);
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

  const exitConfirmUploadPopup = () => {
    setUploadConfirmationVisible(false); 
    localStorage.setItem("isUploaded", JSON.stringify(false));
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
          {combinedImages.map((image) => (
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
              <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                Animal
              </button>
              <button
                className={`mb-5 text-xl font-bold ${
                  combinedImages.length > 0
                    ? 'text-[#016AC7]'
                    : 'text-gray-500 cursor-not-allowed'
                }`}
                onClick={combinedImages.length > 0 ? () => navigate('/all-tags') : null}
              >
                All Tags &#10230;
              </button>
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
            album = {combinedImages[selectedImageIndex].album}
            location = {combinedImages[selectedImageIndex].location}
            onClose={() => setShowModal(false)}
            onEdit={handleOpenEditPopup}
            onMarkSold={handleSold}
            onPrev={handlePreviousImage}
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
          <RestoreValidation
            title="Restore Selected Photos?"
            message="Are you sure you want to restore the selected photo(s) to Home Page?"
            button1Text="Sold"
            button2Text="Cancel"
            onBlue={cancelSold}
            onGreen={confirmSold}
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

        {isUploadConfirmationVisible && (
          <Confirmation
            message="Photo(s) Successfully Uploaded."
            onConfirm={exitConfirmUploadPopup}
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