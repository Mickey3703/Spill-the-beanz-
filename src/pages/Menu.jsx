import React from "react";
import Navbar from "../components/Navbar";
import '../css/MenuArray.css';

export default function Menu({ menuCard, menuCard2, menuCard3, menuCard4, menuCard5,menuCard6}) {
  return (
    <>
      <div>
        <h2 className="menuHeading" style={{ textAlign: "center" }}>Menu</h2>
        <Navbar menuCard={menuCard} menuCard2={menuCard2} menuCard3={menuCard3} menuCard4={menuCard4} menuCard5={menuCard5} menuCard6={menuCard6}/>
      </div>
    </>
  );
}
