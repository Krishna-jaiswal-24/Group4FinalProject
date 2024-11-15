import React from 'react';
import '../css_files/Course.css';

const Course = ({ title, details, semester, onEnroll, showEnrollButton }) => {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p><strong>Semester:</strong> {semester}</p>
      <p>{details}</p>
      {showEnrollButton && (
        <button className="enroll-button" onClick={onEnroll}>
          <span className="plus-icon">+</span> Enroll
        </button>
      )}
    </div>
  );
};

export default Course;
