import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Optional: Load from localStorage
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Optional: Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item with optional quantity logic
  const addItem = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.name === item.name);
      if (existingIndex >= 0) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove an item by index
  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Decrease quantity or remove item entirely
  const decreaseItem = (index) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
      } else {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  // Clear the cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        decreaseItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
