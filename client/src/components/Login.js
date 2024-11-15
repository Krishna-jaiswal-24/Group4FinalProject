import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css_files/Auth.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/login', {
        username,
        password,
      });

      // Store the token and username in localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('username', username); // Save the username
      alert(response.data.message);

      // Redirect to the desired page upon successful login
      navigate('/dashboard'); // change '/dashboard' to your desired route
    } catch (error) {
      setError(error.response?.data?.message || 'Error logging in');
    }
  };

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <button type="button" onClick={handleCreateClick} className="create-btn">
          Create Account
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;
