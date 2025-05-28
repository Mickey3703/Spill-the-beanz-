import React, { useState, useEffect } from 'react';
import './styles/ordertbstyle.css';
 
function ReservationTable({ endpoint }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(); 
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchReservations();
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, [endpoint]);
 
  if (loading) {
    return <p>Loading reservations…</p>;
  }
 
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Contact</th>
          <th>Status</th>  
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.length === 0 ? (
          <tr>
            <td colSpan="3" className="empty-row">
              No reservations found.
            </td>
          </tr>
        ) : (
          reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.customerName || '—'}</td>
              <td>{r.contact || '—'}</td>
              <td>{r.status || '—'}</td>
              <td>
                {r.status === "Pending" && (
                  <>
                    <button className="action" onClick={() => updateReservationStatus(reservation.id, "Approved")}>Approve</button>
                    <button className="action" onClick={() => updateReservationStatus(reservation.id, "Dismissed")}>Dismiss</button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
 
export default function ReservationPage() {
  return (
    <div className="reservation-page">
      <h1>Reservation Management</h1>
      <ReservationTable endpoint="/api/reservations" /> {/* Add reservation endpoint */}
    </div>
  );
};