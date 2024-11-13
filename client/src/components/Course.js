import React from 'react';
import "../css_files/Course.css";

const Course = ({ title, instructor, description }) => {
  return (
    <>
    <div className="course-card">
        <h3 className="course-title">{title}</h3>
        <p className="course-instructor">{instructor}</p>
        <hr className='hl'/>
        <p className="course-description">{description}</p>
        {/* Add any other necessary elements */}
    </div>
    </>
  );
};

export default Course;