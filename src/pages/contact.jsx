import React from "react";
import "../css/Contact.css";             

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="container">
        <h1 className="title">Contact Us</h1>

        <address>
          <p><strong>📍 123 Bean Street, Cape Town, 8001</strong></p>
          <p>📞 +27 21 761 0891</p>
          <p>✉️ spillthebeanz@gmail.com</p>
        </address>

        <div className="map-wrapper">
          <iframe
            title="Coffee Shop Location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.762763807318!2d18.424055216115266!3d-33.924868680640006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc678f631b7d13%3A0x9e1dd7e2b7a296f6!2sCape%20Town%20City%20Hall!5e0!3m2!1sen!2sza!4v1716026943000!5m2!1sen!2sza"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}