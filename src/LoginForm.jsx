import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import './styles/loginstyle.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Login', credentials); // CHANGE - send details to backend
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="input-box">
        <FaUser />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-box">
        <IoIosLock />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkbox-container">
        <label>
          <input type="checkbox" />
          Remember Me
        </label>
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
