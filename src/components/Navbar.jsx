import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
  <ul className="nav-list">
    <li><NavLink to="/hotbev" className="nav-link" activeclassname="active">Hot Beverages</NavLink></li>
    <li><NavLink to="/coldbev" className="nav-link" activeclassname="active">Cold Beverages</NavLink></li>
    <li><NavLink to="/ourteas" className="nav-link" activeclassname="active">Our Teas</NavLink></li>
    <li><NavLink to="/muffins" className="nav-link" activeclassname="active">Our Muffins</NavLink></li>
    <li><NavLink to="/cookies" className="nav-link" activeclassname="active">Our Cookies</NavLink></li>
    <li><NavLink to="/cakes" className="nav-link" activeclassname="active">Our Cakes</NavLink></li>
  </ul>
</nav>
  );
}

export default Navbar;