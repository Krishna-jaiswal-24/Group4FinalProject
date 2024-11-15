import './App.css';
import Courses from './components/Courses';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const courses = [
    { id: 1, title: "React Basics", instructor: "John Doe", description: "Learn the basics of React, including components, state, and props." },
    { id: 2, title: "Advanced JavaScript", instructor: "Jane Smith", description: "Deep dive into JavaScript concepts like closures, promises, and async programming." },
    // Add more courses as needed
  ];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<CreateUser />} />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Courses courses={courses} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
