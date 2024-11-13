import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css_files/Auth.css';

function Login() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form">
        <label>Username:</label>
        <input type="text" placeholder="Enter username" required />
        
        <label>Password:</label>
        <input type="password" placeholder="Enter password" required />

        <button type="submit">Login</button>
        <button type="button" onClick={handleCreateClick} className="create-btn">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Login;
