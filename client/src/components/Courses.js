import React from 'react';
import Course from './Course';
import "../css_files/Courses.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Courses = ({ courses = [] }) => {
  if (!Array.isArray(courses)) {
    return <div>Invalid data format</div>;
  }

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div className="courses-container">
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => (
          <Course
            key={course.id}
            title={course.title}
            instructor={course.instructor}
            description={course.description}
            // Add any other necessary props
          />
        ))
      )}
    </div>
    </>
  );
};

export default Courses;
