import "../css/MenuArray.css";
import "../css/navbar.css";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cakes({ menuItems }) {
  const { addItem } = useContext(CartContext);

  return (
    <main className="main">
      <h2 className="menu-heading">Our Cakes</h2>

      <Navbar />

      <section className="menu-grid cakes-grid">
        {menuItems?.map(({ img, title, description, smallprice }, index) => (
          <article key={index} className="menu-card">
            <img
              src={img}
              alt={`Image of ${title}`}
              className="menu-card-image"
              loading="lazy"
            />
            <h3 className="menu-card-title">{title}</h3>
            <p className="menu-card-description">{description}</p>
            <div className="price">
              <p className="price-text">{smallprice}</p>
            </div>
            <button
              className="add-btn"
              aria-label={`Add ${title} to cart`}
              onClick={() => addItem({ img, title, description, smallprice })}
              type="button"
            >
              Add to Cart
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Cakes;
