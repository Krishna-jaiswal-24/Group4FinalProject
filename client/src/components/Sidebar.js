import React from 'react';
import '../css_files/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-button">All Courses</button>
      <button className="sidebar-button">Enrolled Courses</button>
      <button className="sidebar-button logout">Logout</button>
    </div>
  );
};

export default Sidebar;
