import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../Assets/Icons/account_circle.png';
import homeIcon from '../Assets/Icons/Home.png';
import homeSelectedIcon from '../Assets/Icons/Home-selected.png';
import janeSelectedIcon from '../Assets/Icons/Jane-selected.png';
import soldIcon from '../Assets/Icons/photo.png';
import soldSelectedIcon from '../Assets/Icons/Sold-selected.png';
import uploadIcon from '../Assets/Icons/Upload cloud.png';
import uploadSelectedIcon from '../Assets/Icons/Upload-selected.png';
import trashIcon from '../Assets/Icons/Trash 3.png';
import trashSelectedIcon from '../Assets/Icons/Trash-selected.png';
import statsIcon from '../Assets/Icons/Pie chart.png';
import statsSelectedIcon from '../Assets/Icons/Stats-selected.png';
import albumsIcon from '../Assets/Icons/folder_filled.png';
import albumsSelectedIcon from '../Assets/Icons/Album-selected.png';
import logoutIcon from '../Assets/Icons/Log out.png';
import line from '../Assets/Icons/Line 7.png';
import chevronRightIcon from '../Assets/Icons/Chevron right.png';  

function Navbar() {
  const location = useLocation(); 
  const [albumsVisible, setAlbumsVisible] = useState(false); 
  const [isChevronRotated, setIsChevronRotated] = useState(false);

  const toggleAlbumsVisibility = () => {
    setAlbumsVisible(!albumsVisible);
    setIsChevronRotated(!isChevronRotated); 
  };

  const isAlbumDetailPage = location.pathname.startsWith('/album/');
  const isAlbumsPage = location.pathname === '/albums' || isAlbumDetailPage;

  return (
    <div className="flex flex-col w-36 h-screen bg-Navbar-c text-text-c shadow-lg text-xs pt-0 items-center " >
      <div className="flex items-center justify-center " style={{ paddingTop: '6vh' }}>
        <Link to="/account" className="flex items-center space-x-2 font-bold mr-4">
          {location.pathname === '/account' ? (
            <div className="bg-selected h-10 w-24 flex items-center justify-center rounded-3xl">
            <img src={janeSelectedIcon} alt="Profile" className="h-10 w-10" />
            <span className="ml-2 text-white">Jane</span>
          </div>
          ) : (
            <>
              <img src={profileIcon} alt="Profile" style={{ height: '5vh', width: '5vh' }} />
              <span>Jane</span>
            </>
          )}
        </Link>
      </div>

      <div className="space-y-10 " style={{ paddingTop: '6vh'}}>
      <Link to="/home" className="flex items-center space-x-2 ml-8 hover:font-bold">
      {location.pathname === '/home' ? (
        <div className="bg-selected h-8 w-28 flex items-center justify-center rounded-3xl" style={{ transform: 'translateX(-3vh)' }}>
          <img src={homeSelectedIcon} alt="Home" className="h-6 w-6" />
          <span className="ml-2 text-white">Home</span>
        </div>
      ) : (
        <>
          <img src={homeIcon} alt="Home" style={{ height: '3vh', width: '3vh' }} />
          <span>Home</span>
        </>
      )}
    </Link>


        <Link to="/sold" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/sold' ? (
            <div className="bg-selected h-8 w-28 flex items-center justify-center rounded-3xl" style={{ transform: 'translateX(-3vh)' }}>
            <img src={soldSelectedIcon} alt="Sold" className="h-6 w-6" />
            <span className="ml-2 text-white">Sold</span>
          </div>
          ) : (
            <>
              <img src={soldIcon} alt="Sold" style={{ height: '3vh', width: '3vh' }} />
              <span>Sold</span>
            </>
          )}
        </Link>

        <Link to="/upload" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/upload' ? (
            <div className="bg-selected h-8 w-28 flex items-center justify-center rounded-3xl" style={{ transform: 'translateX(-3vh)' }}>
            <img src={uploadSelectedIcon} alt="Upload" className="h-6 w-6" />
            <span className="ml-2 text-white">Upload</span>
          </div>
          ) : (
            <>
              <img src={uploadIcon} alt="Upload" style={{ height: '3vh', width: '3vh' }} />
              <span>Upload</span>
            </>
          )}
        </Link>

        <Link to="/albums" className="flex items-center space-x-2  hover:font-bold">
            {isAlbumsPage ? (
              <div className="flex items-center"> 
                <img
                  src={chevronRightIcon}
                  alt="Chevron"
                  className="" 
                  style={{
                    height: '2vh',
                    width: '2vh',
                  }}                
                />
                <div className="bg-selected h-8 w-28 flex items-center justify-center rounded-3xl">
                  <img src={albumsSelectedIcon} alt="Album" className="h-6 w-6" />
                  <span className="ml-2 text-white">Albums</span>
                </div>
              </div>
            ) : (
              <>
                <img src={albumsIcon} alt="Albums" className="ml-8"style={{ height: '3vh', width: '3vh' }} />
                <span>Albums</span>
              </>
            )}
          </Link>


        <div className="flex items-center justify-center hover:font-bold">
          <img src={line} alt="Separator" />
        </div>

        <Link to="/statistics" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/statistics' ? (
            <div className="bg-selected h-8 w-28 flex items-center justify-center rounded-3xl" style={{ transform: 'translateX(-2vh)' }}>
              <img src={statsSelectedIcon} alt="Statistics" className="h-6 w-6" />
              <span className="ml-2 text-white">Statistics</span>
            </div>
          ) : (
            <>
              <img src={statsIcon} alt="Statistics" style={{ height: '3vh', width: '3vh' }} />
              <span>Statistics</span>
            </>
          )}
        </Link>

        <Link to="/trash" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/trash' ? (
            <div className="bg-selected h-8 w-28 flex items-center justify-center rounded-3xl" style={{ transform: 'translateX(-3vh)' }}>
              <img src={trashSelectedIcon} alt="Trash" className="h-6 w-6" />
              <span className="ml-2 text-white">Trash</span>
            </div>
          ) : (
            <>
              <img src={trashIcon} alt="Trash" style={{ height: '3vh', width: '3vh' }} />
              <span>Trash</span>
            </>
          )}
        </Link>

        <div style={{ paddingTop: '12vh'}}>
          <Link to="/login" className="flex items-center space-x-2 ml-8 hover:font-bold" >
            <img src={logoutIcon} alt="Log Out" style={{ height: '3vh', width: '3vh' }} />
            <span>Log Out</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;