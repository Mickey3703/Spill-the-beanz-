import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import './styles/loginstyle.css';

const RegisterForm = () => {
    // state to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // CHANGE THIS - send data to backend - replace with API call
    console.log('Register:', formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div className="input-box">
        <FaUser />
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-box">
        <FaUser />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-box">
        <IoMdMail />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-box">
        <IoIosLock />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="signup-promo">
        <h4>Enjoy 20% off your first order!</h4>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          I agree to the <a href="#">terms &amp; conditions</a>
        </label>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
