import "../css/MenuArray.css";
import "../css/navbar.css";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cookies({
  menuCard,
  menuCard2,
  menuCard3,
  menuCard4,
  menuCard5,
  menuCard6,
}) {
  const { addItem } = useContext(CartContext);
  return (
    <div className="main">
      <h2>Menu</h2>
      <Navbar
        menuCard={menuCard}
        menuCard2={menuCard2}
        menuCard3={menuCard3}
        menuCard4={menuCard4}
        menuCard5={menuCard5}
        menuCard6={menuCard6}
      />

      <div className="ourCookies">
        {menuCard5?.map((item, index) => (
          <div key={index} className="menu-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="price">
              <p>{item.smallprice}</p>
            </div>
             <button
              className="add-btn"
              onClick={() => addItem(item)}>
              Add&nbsp;to&nbsp;Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cookies;
