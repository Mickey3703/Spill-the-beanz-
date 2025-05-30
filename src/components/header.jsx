import logo from "../assets/ChatGPT1.png";
import { useNavigate } from "react-router-dom";
import "../css/MenuArray.css";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className="main-header enlarged-header">
        <img
          src={logo}
          alt="Coffee Shop Logo"
          className="clickable-logo"
          onClick={() => navigate("/App")}
        />
        <nav className="nav-links">
          <button onClick={() => navigate("/order")}>Orders</button>
          <button onClick={() => navigate("/booking")}>Reservation</button>
          <button onClick={() => navigate("/menu")}>Menu</button>
          <button onClick={() => navigate("/about")}>About Us</button>
          <button onClick={() => navigate("/contact")}>Contact Us</button>
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </nav>
      </header>

      {/* VIDEO SECTION */}
      <section className="video-section">
        <video autoPlay muted loop className="C:\Users\Mikaeel\Desktop\SpillFinal\Spill-the-beanz--DaniBoy\public\video\Coffee-Intro.mp4">
          <source src="/videos/Coffee-Intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h2>Experience the Brew</h2>
          <p>Fresh beans. Warm hearts. Beautiful mornings start here.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <section className="info-section">
          <h2>Our Story</h2>
          <p>From humble beginnings, our café was founded on love, warmth, and a passion for quality brews. Today, we serve thousands of customers, each cup crafted with care.</p>
        </section>
        <section className="info-section">
          <h2>What We Offer</h2>
          <p>Enjoy a wide range of handpicked teas, bold coffees, and fresh baked goods. Whether you’re dining in or ordering out, we guarantee flavor and freshness in every sip and bite.</p>
        </section>
        <section className="info-section">
          <h2>Visit Us</h2>
          <p>Located in the heart of the city, our cozy space is perfect for studying, relaxing, or catching up with friends. Come feel at home with the aroma of freshly brewed coffee.</p>
        </section>
      </main>

      <footer className="main-footer">
        <p>&copy; {new Date().getFullYear()} Coffee Time. All rights reserved.</p>
        <p>Designed with ❤️ by Your Brand</p>
      </footer>
    </>
  );
}

export default Header;
