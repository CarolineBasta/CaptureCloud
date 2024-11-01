import './css/Home.css'; 
import React, { useState, useEffect } from 'react';


function Home() {

    const [navVisible, setNavVisible] = useState(false);

    const toggleNav = () => {
        setNavVisible(!navVisible);
    };
    return (
        <div id="home">
            <div className="everything-box">
                <div className="top-bar">
                    <div onClick={toggleNav} title="Menu" className="menu-icon">☰</div>
                   
                </div>
                {navVisible && (
                    <div className="vertical-nav">
                         <div onClick={toggleNav} title="Menu" className="menu-icon">☰</div>
                         {/* put navigation bar stuff here */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;