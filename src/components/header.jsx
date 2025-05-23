import logo from "../assets/ChatGPT1.png";
import { useNavigate } from "react-router-dom";
import "../css/MenuArray.css";

function Header() {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/order");
  };

  const handleBooking = () => {
    navigate("/booking");
  };

  const handleMenu = () => {
    navigate("/menu");
  };

  const handlePromo = () => {
    navigate("/App");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleContact = () => {
    navigate("/contact");
  };
  return (
    <>
      <div className="header">
        <button onClick={handlePromo}>Home</button>
        <button onClick={handleOrder}>Your Order</button>
        <button onClick={handleBooking}>Reservation</button>
        <div className="headerLogo">
          <img src={logo} alt="Logo" width="400" height="350" />
        </div>
        <button onClick={handleMenu}>Menu</button>
        <button onClick={handleAbout}>About Us</button>
        <button onClick={handleContact}>Contact Us</button>
      </div>
    </>
  );
}

export default Header;
