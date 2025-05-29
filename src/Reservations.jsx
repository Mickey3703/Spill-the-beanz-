import React, { useState, useEffect } from 'react';
import './styles/ordertbstyle.css';
 
const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations'); // add API for reservations
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const updateReservationStatus = async (id, status) => { // approve or dismiss reservations
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update reservation');

      fetchReservations(); // refresh list after update
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  useEffect (() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading reservations...</p>;

  return (
    <table className="reservation-table">
      <thead>
        <tr>
          <th>Reservation</th>
          <th>Customer</th>
          <th>Table</th>
          <th>Date</th>
          <th>From</th>
          <th>Until</th>
          <th>Party Size</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.length === 0 ? (
          <tr>
            <td colSpan="9" className="empty-row">
              No reservations found.
            </td>
          </tr>
        ) : (
          reservations.map((r) => (
            <tr key={r.reservation_id}>
              <td>{r.reservation_id || '—'}</td>
              <td>{r.customer_id || '—'}</td>
              <td>{r.table_id || '—'}</td>
              <td>{r.reservation_date || '—'}</td>
              <td>{r.start_time || '—'}</td>
              <td>{r.end_time || '—'}</td>
              <td>{r.party_size || '—'}</td>
              <td>{r.status || '—'}</td>
              <td>
                {r.status === "Pending" && (
                  <>
                    <button className="action" onClick={() => updateReservationStatus(r.reservation_id, "Confirmed")}>Confirm</button>
                    <button className="action" onClick={() => updateReservationStatus(r.reservation_id, "Cancelled")}>Cancel</button>
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
 
export default ReservationTable;