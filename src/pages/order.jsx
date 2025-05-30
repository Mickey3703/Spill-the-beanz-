import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../css/order.css";

export default function Order() {
  const { cart, removeItem, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="order-container">
      <h1 className="order-title">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link className="back-link" to="/menu">
            Back to menu
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, idx) => (
              <li key={idx} className="cart-item">
                <div>
                  <strong>{item.title}</strong> – {item.size} ({item.price})
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(idx)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: {total.toFixed(2)}</h3>
          </div>

          <div className="cart-actions">
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/menu" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}