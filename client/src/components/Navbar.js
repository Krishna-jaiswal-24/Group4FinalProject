import React from "react";
import "../css_files/Navbar.css"; // Importing the CSS file

const Navbar = () => {
  const username = localStorage.getItem('username');

  return (
    <nav className="navbar">
      <div className="navbar-logo">Website Name</div>
      <div className="navbar-user">
        <img src="path-to-your-user-logo.png" alt="User" className="user-logo" />
        <p>{username}</p>
      </div>
    </nav>
  );
};

export default Navbar;
