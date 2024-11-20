// import React from 'react';

// const Header = () => (
//   <header>
//     <h1>Disney Memories</h1>
//   </header>
// );

// export default Header;

// updated 11/01/2024
import React from 'react';
import { Link } from 'react-router-dom';
// import '../css/Header.css'; // Make sure you have a CSS file for styling
import logo1 from "../images/MikeyMouseLogo_3.png"

const Header = () => (
  <header className="header">
    <Link to="/view-list">
      <img
        src={logo1} // Ensure the logo file is in the public folder
        alt="Mickey Mouse Logo"
        className="logo"
      />
    </Link>
    <h1 className="header-title">Disney Memories</h1>   
  </header>
);

export default Header;
