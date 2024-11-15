import React from "react";
import "../css_files/Navbar.css"; // Importing the CSS file

const Navbar = () => {
  // const handleLogout = () => {
  //   // Handle logout functionality
  //   console.log("User logged out");
  // };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Website Name</div>
      <div className="navbar-user">
        <img src="path-to-your-user-logo.png" alt="User" className="user-logo" />
      </div>
    </nav>
  );
};

export default Navbar;
