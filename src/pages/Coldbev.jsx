import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "../css/MenuArray.css";
import "../css/navbar.css";

export default function Coldbev({
  menuCard,
  menuCard2,
  menuCard3,
  menuCard4,
  menuCard5,
  menuCard6,
}) {
  const { addItem } = useContext(CartContext);
  const [selectedSizes, setSelectedSizes] = useState({});

  const onSizeChange = (idx, size) =>
    setSelectedSizes((prev) => ({ ...prev, [idx]: size }));

  const onAdd = (item, idx) => {
    const size = selectedSizes[idx] || "small";
    const price =
      size === "small"
        ? item.smallprice
        : size === "medium"
        ? item.mediumprice
        : item.largeprice;

    addItem({ ...item, size, price });
  };

  return (
    <div className="main">
      <h2>Cold Beverages</h2>

      <Navbar
        menuCard={menuCard}
        menuCard2={menuCard2}
        menuCard3={menuCard3}
        menuCard4={menuCard4}
        menuCard5={menuCard5}
        menuCard6={menuCard6}
      />

      <div className="cards">
        {menuCard2?.map((item, idx) => (
          <div key={idx} className="card">
            <img src={item.img} alt={item.title} />

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div className="price">
              <label>
                Size&nbsp;
                <select
                  value={selectedSizes[idx] || "small"}
                  onChange={(e) => onSizeChange(idx, e.target.value)}
                >
                  <option value="small">
                    Small – {item.smallprice}
                  </option>
                  <option value="medium">
                    Medium – {item.mediumprice}
                  </option>
                  <option value="large">
                    Large – {item.largeprice}
                  </option>
                </select>
              </label>
            </div>

            <button className="add-btn" onClick={() => onAdd(item, idx)}>
              Add&nbsp;to&nbsp;Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
