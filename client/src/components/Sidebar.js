import React from 'react';
import '../css_files/Sidebar.css';

const Sidebar = ({ setView, view, onLogout }) => {
  return (
    <div className="sidebar">
      <button
        className={`sidebar-button ${view === 'all' ? 'active' : ''}`}
        onClick={() => setView('all')}
      >
        All Courses
      </button>
      <button
        className={`sidebar-button ${view === 'enrolled' ? 'active' : ''}`}
        onClick={() => setView('enrolled')}
      >
        Enrolled Courses
      </button>
      <button className="sidebar-button logout" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
