import React, { useState, useEffect } from 'react'; 
import './styles/ordertbstyle.css';

// component for OrdersTable
const OrdersTable = ({ endpoint }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [endpoint]); 

  if (loading) return <p>Loading orders...</p>;

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Type</th>
          <th>Date</th>
          <th>Instructions/Requests</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan="7" className="empty-row">No orders found.</td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_name || '—'}</td>
              <td>{order.order_type || '—'}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>{order.special_instructions || '—'}</td>
              <td>{order.order_status || '—'}</td>
              <td>{order.final_amount ? `$${parseFloat(order.final_amount).toFixed(2)}` : '—'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};


//parent component to handle tabs and switch between order types
export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("online");         //online or instore orders

  return (
    <div className="orders-page">
      <h1>Order Management</h1>

      <div className="order-tabs">
        <button
          onClick={() => setActiveTab("online")}
          className={activeTab === "online" ? "active" : ""}
        >
          Online Orders
        </button>
        <button
          onClick={() => setActiveTab("instore")}
          className={activeTab === "instore" ? "active" : ""}
        >
          In-Store Orders
        </button>
      </div>

      {activeTab === "online" ? (
        <OrdersTable endpoint="/api/online-orders" />  //add online orders endpoint
      ) : (
        <OrdersTable endpoint="/api/instore-orders" />  //add in-store orders endpoint
      )}
    </div>
  );
};