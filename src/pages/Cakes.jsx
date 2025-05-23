import "../css/MenuArray.css";
import "../css/navbar.css";
import Navbar from "../components/Navbar";

function Cakes({
  menuCard,
  menuCard2,
  menuCard3,
  menuCard4,
  menuCard5,
  menuCard6,
}) {
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
        {menuCard6?.map((item, index) => (
          <div key={index} className="menu-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="price">
              <p>{item.smallprice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cakes;
