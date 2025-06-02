import React, { useState, useEffect } from 'react'; 
import './styles/ordertbstyle.css';

// component for OrdersTable
const OrdersTable = ({ endpoint, filterType }) => {
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

  const handleStatusChange = async (orderId, orderType, newStatus) => {
    try {
      const response = await fetch(`${endpoint}/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          orderType: orderType,
          newStatus: newStatus,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      fetchOrders();
      } catch (error) {
        console.error("Error updating order status", error);
      }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [endpoint]); 

  if (loading) return <p>Loading orders...</p>;

  const filteredRows = orders.flatMap((order) =>
    order.orders
      .filter((o) => o.orderType?.toLowerCase() === filterType.toLowerCase())
      .map((o, index) => (
        <tr key={`${order.orderId}-${index}`}>
          <td>{order.orderId}</td>
          <td>{order.customerName || '—'}</td>
          <td>{order.email || order.phoneNumber || '—'}</td>
          <td>{new Date(o.orderDate).toLocaleString()}</td>
          <td>{o.specialInstructions || '—'}</td>
          {/* <td>{o.orderStatus || '—'}</td>*/}
          <td>
            <select value={o.orderStatus} onChange={(e) =>
              handleStatusChange(order.orderId, o.orderType, e.target.value)
              }>
                <option value="Pending">Pending</option>
                <option value="Completed">Collected</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </select>
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

      <OrdersTable endpoint="https://localhost:7264/api/Orders" filterType={activeTab} />
    </div>
  );
};