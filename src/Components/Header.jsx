import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/STB-logo.png';
import '../styles/headerstyle.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/menu')}>Admin Menu</button>
      </div>

      <div className="header-logo">
        <img src={logo} alt="Spill The Beanz Logo" width="120" />
      </div>

      <div className="header-right">
        <button onClick={() => navigate('/orders')}>Customer Orders</button>
        <button onClick={() => navigate('/booking')}>Customer Reservations</button>
      </div>
    </header>
  );
};

export default Header;