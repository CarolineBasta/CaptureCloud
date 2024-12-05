import React, { useEffect } from "react";
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker10 from '../Assets/Icons/Group 29.png';
import marker11 from '../Assets/Icons/Group 30.png';
import marker12 from '../Assets/Icons/Group 31.png';
import marker13 from '../Assets/Icons/Group 32.png';
import marker14 from '../Assets/Icons/Group 33.png';


function Map() {
    useEffect(() => { document.title = 'Map'; });
    const navigate = useNavigate();

    const handleMarkerClick1 = () => {
        navigate('/mapPhotos2');
    };

    const handleMarkerClick2 = () => {
        navigate('/mapPhotos3');
    };

    const handleMarkerClick3 = () => {
        navigate('/mapPhotos');
    };

    const handleMarkerClick4 = () => {
        navigate('/mapPhotos4');
    };

    const handleMarkerClick5 = () => {
        navigate('/mapPhotos5');
    };


    // Create an icon with custom size
    const createCustomIcon = (size) => {
        return new L.Icon({
            iconUrl: marker10,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon",
        });
    };
    const customIcon = createCustomIcon(90);

    const createCustomIcon2 = (size) => {
        return new L.Icon({
            iconUrl: marker11,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon2", 
        });
    };
    const customIcon2 = createCustomIcon2(90);

    const createCustomIcon3 = (size) => {
        return new L.Icon({
            iconUrl: marker12,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon3", 
        });
    };
    const customIcon3 = createCustomIcon3(90);

    const createCustomIcon4 = (size) => {
        return new L.Icon({
            iconUrl: marker13,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon4", 
        });
    };
    const customIcon4 = createCustomIcon4(90);

    const createCustomIcon5 = (size) => {
        return new L.Icon({
            iconUrl: marker14,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon4", 
        });
    };
    const customIcon5 = createCustomIcon5(90);


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
                    Map
                </h1>

                {/* Map Section */}
                <div className="flex justify-center ml-36 mb-12 px-4 sm:px-8 lg:px-12">
                    <MapContainer
                        center={[54.2731, -61.7388]}
                        zoom={2}
                        style={{ height: "590px", width: "100%" }}
                        maxBounds={[
                            [-90, -180], 
                            [90, 180],
                        ]} 
                        minZoom={2} 
                        
                        >
                        {/* Leaflet Credit Display */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        />

                        {/* France Marker */}
                        <Marker
                            position={[46.2276, 2.2137]} 
                            icon={customIcon}
                            eventHandlers={{
                                click: handleMarkerClick1,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon(90)); 
                                },
                            }}
                        />
                        {/* Ontario Marker */}
                        <Marker
                            position={[51.2538, -85.3232]}
                            icon={customIcon2}
                            eventHandlers={{
                                click: handleMarkerClick2,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon2(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon2(90)); 
                                },
                            }}
                        />
                        {/* Banff Marker */}
                        <Marker
                            position={[51.1784, -115.5708]}
                            icon={customIcon3}
                            eventHandlers={{
                                click: handleMarkerClick3,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon3(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon3(90)); 
                                },
                            }}
                        />
                        {/* Seoul Marker */}
                        <Marker
                            position={[37.5503, 126.9971]}
                            icon={customIcon4}
                            eventHandlers={{
                                click: handleMarkerClick4,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon4(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon4(90)); 
                                },
                            }}
                        />
                        {/* Egypt Marker */}
                        <Marker
                            position={[26.8206, 30.8025]}
                            icon={customIcon5}
                            eventHandlers={{
                                click: handleMarkerClick5,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon5(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon5(90)); 
                                },
                            }}
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Map;