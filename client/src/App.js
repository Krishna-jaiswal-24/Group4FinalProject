import './App.css';
import Courses from './components/Courses';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

function App() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      instructor: "John Doe",
      description: "Learn the basics of React, including components, state, and props."
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript concepts like closures, promises, and async programming."
    },
    {
      id: 3,
      title: "React Basics",
      instructor: "John Doe",
      description: "Learn the basics of React, including components, state, and props."
    },
    {
      id: 4,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript concepts like closures, promises, and async programming."
    },
    {
      id: 5,
      title: "React Basics",
      instructor: "John Doe",
      description: "Learn the basics of React, including components, state, and props."
    },
    {
      id: 6,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript concepts like closures, promises, and async programming."
    },
    {
      id: 7,
      title: "React Basics",
      instructor: "John Doe",
      description: "Learn the basics of React, including components, state, and props."
    },
    {
      id: 8,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript concepts like closures, promises, and async programming."
    },
    {
      id: 9,
      title: "React Basics",
      instructor: "John Doe",
      description: "Learn the basics of React, including components, state, and props."
    },
    {
      id: 10,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript concepts like closures, promises, and async programming."
    },
    {
      id:11,
      title: "React Basics",
      instructor: "John Doe",
      description: "Learn the basics of React, including components, state, and props."
    },
    {
      id: 12,
      title: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript concepts like closures, promises, and async programming."
    }
  ];
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
    {/* <Navbar/>
    <Courses courses={courses} />
    <Sidebar/> */}
    </>
  );
}

export default App;
