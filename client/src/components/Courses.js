import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from './Course';
import "../css_files/Courses.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [view, setView] = useState('enrolled'); // 'enrolled' or 'all'
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  // Get the token and username from localStorage
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchCourses = async () => {
      console.log('Auth-Token being sent:', token);

      if (!token) {
        alert('Token is missing. Please log in again.');
        handleLogout();
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/v1/user/userCourse', {
          headers: {
            'auth-token': token,
          },
        });

        const response2 = await axios.get('http://localhost:8000/api/v1/course/fetch', {
          headers: {
            'auth-token': token,
          },
        });

        const allCourses = response2.data.data;
        const enrolledCourses=response.data.data.course;
        
        console.log('All Courses:', allCourses);

        // Filter enrolled courses based on username
        const enrolled = allCourses.filter((course) =>
          Array.isArray(course.enrollStatus)
            ? course.enrollStatus.includes(username)
            : course.enrollStatus.split(',').includes(username)
        );

        setCourses(allCourses);
        setEnrolledCourses(enrolledCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);

        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          handleLogout();
        } else if (error.response && error.response.status === 403) {
          alert('You are not authorized to access this resource.');
        } else {
          alert('An error occurred while fetching courses.');
        }
      }
    };

    fetchCourses();
  }, [token, username]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const displayedCourses = view === 'enrolled' ? enrolledCourses:courses;
  console.log("course",courses);

  return (
    <>
      <Navbar />
      <Sidebar setView={setView} view={view} onLogout={handleLogout} />
      <div className="courses-container">
        {displayedCourses.length === 0 ? (
          <p>{view === 'enrolled' ? 'No enrolled courses available' : 'No courses available'}</p>
        ) : (
          displayedCourses.map((course) => (
            <Course
              key={course._id}
              title={course.title}
              details={course.details}
              semester={course.semester}
              showEnrollButton={view !== 'enrolled'}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Courses;
