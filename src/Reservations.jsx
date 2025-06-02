import React, { useState, useEffect } from 'react';
import './styles/ordertbstyle.css';
 
const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`https://localhost:7264/api/TableReservations`); // add API for reservations
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const updateReservationStatus = async (reservationId, reservationStatus) => { // approve or dismiss reservations
    try {
      const response = await fetch(`https://localhost:7264/api/TableReservations/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationStatus }),
      });

      if (!response.ok) throw new Error('Failed to update reservation');

      fetchReservations(); // refresh list after update
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const deleteReservation = async (reservationId)  => {
    try {
      const response = await fetch (`https://localhost:7264/api/TableReservations/${reservationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reservation');

      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation', error);
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
          <th>Res #</th>
          <th>Customer</th>
          <th>Contact</th>
          <th>Table #</th>
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
          reservations.map((r) =>
            r.tableReservations.map((table, index) => (
              <tr key={`${r.reservationId}-${index}`}>
                <td>{r.reservationId || '—'}</td>
                <td>{r.customerName || '—'}</td>
                <td>{r.email || r.phoneNumber || '—'}</td>
                <td>{table.tableId || '—'}</td>
                <td>{table.reservationDate || '—'}</td>
                <td>{table.startTime || '—'}</td>
                <td>{table.endTime || '—'}</td>
                <td>{table.partySize || '—'}</td>
                <td>{table.specialRequests || '—'}</td>
                <td>{table.reservationStatus || '—'}</td>
                <td>
                  {table.reservationStatus === "Pending" ? (
                    <>
                      <button className="action" onClick={() => updateReservationStatus(r.reservationId, "Confirmed")}>
                        Confirm
                      </button>
                      <button className="action" onClick={() => updateReservationStatus(r.reservationId, "Cancelled")}>
                        Cancel
                      </button>
                      <button className="action" onClick={() => deleteReservation(r.reservationId)}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <em>{table.reservationStatus}</em>
                  )}
                </td>
              </tr>
            )
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
      <ReservationTable />
    </div>
  );
};