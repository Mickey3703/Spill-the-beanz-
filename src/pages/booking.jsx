import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Booking.css";   

export default function Booking() {
  const [formData, setFormData] = useState({
    date: "",
    time: "18:00",
    people: "2",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert("Thanks! We’ve received your reservation request. We will get back to you via email shortly.");
    setFormData((prev) => ({ ...prev, comments: "" }));
  };

  return (
    <div className="booking-page">

      <main className="booking-main">
        
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>BOOKING</h2>

          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="people">People</label>
            <select
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
            >
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>

          <div className="form-split">
            <div className="form-row">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-split">
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="comments">Comments&nbsp;(optional)</label>
            <textarea
              id="comments"
              name="comments"
              rows="3"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-book">
            Book a table
          </button>
        </form>
      </main>
    </div>
  );
}