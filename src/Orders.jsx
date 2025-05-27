import React, { useState, useEffect } from 'react'; //store and change data  and run code automatically


//component to display orders table
function OrdersTable({ endpoint }) {
  const [orders, setOrders] = useState([]);

  //function to fetch orders from backend API
  const fetchOrders = async () => {
    try {
      const res = await fetch(endpoint);                    //send GET request to the given endpoint
      const data = await res.json();                        //parse JSON response
      setOrders(data);                                      //update state with order data
    } catch (err) {
      console.error("Failed to fetch orders:", err);        //log any errors
    }
  };

  //useEffect: run on first load and when endpoint changes
  useEffect(() => {
    fetchOrders();                                          //fetch immediately
    const interval = setInterval(fetchOrders, 5000);        //refresh every 5 seconds
    return () => clearInterval(interval);                   //cleanup on unmount
  }, [endpoint]);

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Contact details</th>
          <th>Address</th>
          <th>Items</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan="6" className="empty-row">No orders found.</td>
          </tr>
        ) : (
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer || '—'}</td>
              <td>{(order.email || order.phone) ? `${order.email} / ${order.phone}` : '—'}</td>
              <td>{order.address || '—'}</td>
              <td>{order.items.join(", ") || '—'}</td>
              <td>{order.status || '—'}</td>
              <td>{order.total ? `$${order.total.toFixed(2)}` : '—'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

//parent component to handle tabs and switch between order types
export default function OrdersPage() {
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