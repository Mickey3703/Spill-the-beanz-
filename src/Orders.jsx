import React, { useState, useEffect } from 'react';
import './styles/ordertbstyle.css';
 
const OrdersTable = ({ endpoint, filterType }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
 
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching from:", endpoint);
      const response = await fetch(endpoint);
 
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
 
      const data = await response.json();
      console.log("Fetched data:", data);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
 
  const handleStatusChange = async (orderId, newStatus) => {
  if (!newStatus) return;
  setUpdatingOrderId(orderId);
  setError(null);
 
  try {
    const response = await fetch(`${endpoint}/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderStatus: newStatus }),
    });
 
    if (!response.ok) {
      // Try to get error message from server
      const errorText = await response.text();
      throw new Error(`Failed to update status: ${response.status} ${response.statusText} - ${errorText}`);
    }
 
    // Refetch after success
    await fetchOrders();
  } catch (err) {
    console.error("Error updating order status", err);
    setError(err.message);
  } finally {
    setUpdatingOrderId(null);
  }
};
 
 
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [endpoint]);
 
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
 
  // Flatten orders and filter by orderType
  const filteredRows = orders.flatMap(order =>
    order.orders
      .filter(o => o.orderType?.toLowerCase() === filterType.toLowerCase())
      .map((o, idx) => (
        <tr key={`${order.orderId}-${idx}`}>
          <td>{order.orderId}</td>
          <td>{order.customerName || '—'}</td>
          <td>{order.email || order.phoneNumber || '—'}</td>
          <td>{new Date(o.orderDate).toLocaleString()}</td>
          <td>{o.specialInstructions || '—'}</td>
          <td>
            <div className="status-buttons">
              {["Received", "Preparing", "Ready", "Completed", "Cancelled"].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(order.orderId, status)}
                  disabled={o.orderStatus === status || updatingOrderId === order.orderId}
                  className={o.orderStatus === status ? "active-status" : ""}
                >
                  {status}
                </button>
              ))}
            </div>
          </td>
          <td>{o.finalAmount !== undefined ? `$${parseFloat(o.finalAmount).toFixed(2)}` : '—'}</td>
        </tr>
      ))
  );
 
  return (
    <table className="orders-table">
      
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Contact</th>
          <th>Date</th>
          <th>Instructions</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {filteredRows.length === 0 ? (
          <tr>
            <td colSpan="7" className="empty-row">No orders found.</td>
          </tr>
        ) : (
          filteredRows
        )}
      </tbody>
    </table>
  );
};
 
export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("online");
 
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
 
      <OrdersTable endpoint="https://localhost:7264/api/Orders" filterType={activeTab} />
    </div>
  );
}