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
          <th>Contact</th>
          <th>Table</th>
          <th>Date</th>
          <th>From</th>
          <th>Until</th>
          <th>Party Size</th>
          <th>Special Requests</th>
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
            <tr key={r.reservationId}>
              <td>{r.reservationId || '—'}</td>
              <td>{r.customerName || '—'}</td>
              <td>{r.email || r.phoneNumber ||'—'}</td>
              <td>{r.tableId || '—'}</td>
              <td>{r.reservationDate || '—'}</td>
              <td>{r.start_time || '—'}</td>
              <td>{r.end_time || '—'}</td>
              <td>{r.seatsNumbers}</td>
              <td>{r.specialRequests || '—'}</td>
              <td>{r.reservationStatus || '—'}</td>
              <td>
                {r.reservationStatus === "Pending" && (
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
 
export default function AdminReservations () {
  return (
    <div className="reservation-page">
      <h1>Reservation Management</h1>
      <div className="reservation-tabs">
        <button className="active">All Reservations</button>
      </div>
      <ReservationTable endpoints="/api/reservations" />
    </div>
  );
};