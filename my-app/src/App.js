import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Album from './Pages/Album';
import Statistics from './Pages/Statistics';
import Trash from './Pages/Trash';
import Sold from './Pages/Sold';
import Upload from './Pages/Upload';
import AllTags from './Pages/AllTags';
import AlbumDetails from './Pages/AlbumDetails';  
import Flowers from './Pages/Flowers';
import Map from './Pages/Map'
import MapPhotos from './Pages/MapPhotos'
import MapPhotos2 from './Pages/MapPhotos2'
import MapPhotos3 from './Pages/MapPhotos3'
import MapPhotos4 from './Pages/MapPhotos4'
import MapPhotos5 from './Pages/MapPhotos5'
import TagsList from './Pages/TagsList';
import Animaltag from './Pages/Animaltag';
import Skytag from './Pages/Skytag';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/albums" element={<Album />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/animaltag" element={<Animaltag />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/sold" element={<Sold />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/album/:name" element={<AlbumDetails />} />  
        <Route path="/Flowers" element={<Flowers />} />
        <Route path="/all-tags" element={<AllTags />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mapPhotos" element={<MapPhotos />} />
        <Route path="/mapPhotos2" element={<MapPhotos2 />} />
        <Route path="/mapPhotos3" element={<MapPhotos3 />} />
        <Route path="/mapPhotos4" element={<MapPhotos4 />} />
        <Route path="/mapPhotos5" element={<MapPhotos5 />} />
        <Route path="/tagslist" element={<TagsList />} />
        <Route path="/skytag" element={<Skytag />} />
      </Routes>
    </Router>
  );
}

export default App;