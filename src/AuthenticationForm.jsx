import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import './styles/loginstyle.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '', role: '' });
  const [registerData, setRegisterData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    address: '',
    agree: false,
  });

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5287/api/Auth/login`, { // add API for login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error('Invalid credentials');
      const result = await response.json();

      localStorage.setItem('user', JSON.stringify(result));

      if (result.role === 'Admin') navigate('/AdminMenu');
      else navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!registerData.role) {
      alert('Please select a role.');
      return;
    }

    const endpoint = 
      registerData.role === 'Admin'
        ? 'http://localhost:5287/api/Auth/registerAdmin'          // add API for register admin
        : 'http://localhost:5287/api/Auth/registerCustomer';      // add API for register customer

    const payload =
      registerData.role === 'Admin'
        ? {
            name: registerData.name,
            email_address: registerData.email,
            password: registerData.password,
          }
        : {
            customer_name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            phone_number: registerData.phone_number,
            address: registerData.address,
          };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Registration failed');

      alert('Registration successful! You can now log in.');
      setIsLogin(true);
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <form className="form" onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

          <div className="input-box">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={isLogin ? loginData.role : registerData.role}
              onChange={isLogin ? handleLoginChange : handleRegisterChange}
              required
            >
              <option value=""></option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {!isLogin && (
            <>
              <div className="input-box">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              {registerData.role === 'Customer' && (
                <>
                  <div className="input-box">
                    <input
                      type="text"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={registerData.phone_number}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={registerData.address}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div className="input-box">
            <IoMdMail />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={isLogin ? loginData.email : registerData.email}
              onChange={isLogin ? handleLoginChange : handleRegisterChange}
              required
            />
          </div>

          <div className="input-box">
            <IoIosLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={isLogin ? loginData.password : registerData.password}
              onChange={isLogin ? handleLoginChange : handleRegisterChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-box">
                <IoIosLock />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
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
                    checked={registerData.agree}
                    onChange={handleRegisterChange}
                    required
                  />
                  I agree to the <a href="#">terms &amp; conditions</a>
                </label>
              </div>
            </>
          )}

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

          <p className="toggle-auth">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;