import React from 'react';
import '../css_files/Auth.css';

function CreateUser() {
  return (
    <div className="form-container">
      <h2>Create User</h2>
      <form className="form">
        <label>Username:</label>
        <input type="text" placeholder="Enter username" required />

        <label>Password:</label>
        <input type="password" placeholder="Enter password" required />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;
