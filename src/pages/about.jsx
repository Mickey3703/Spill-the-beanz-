import React from "react";
import "../css/About.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="container">
        <h1 className="title">About Us</h1>

        <p className="lead">
          We’re a small batch roastery and pâtisserie based in Cape Town, serving ethically-sourced coffee and artisan bakes since 2018.
        </p>

        <p>
          What began as a modest dream between five friends and a second-hand espresso machine has grown into one of Cape Town’s coziest coffee hideouts. Whether you're here for a velvety flat white, a buttery butter biscuit, or a bit of quiet, we aim to offer a space that feels like a second home.
        </p><br></br>

        <p>
          Our beans are responsibly sourced from farms across Ethiopia, Rwanda, and Tanzania, roasted in-house to highlight their natural sweetness and complexity. We pair our brews with daily fresh bakes from our pâtisserie kitchen, inspired by French and South African flavors alike.
        </p>

        <h2>Our Mission</h2>
        <ul>
          <li>Roast the freshest African beans within 48 hours of serving.</li>
          <li>Support local farmers through direct-trade partnerships.</li>
          <li>uild a welcoming, inclusive third place for our community.</li>
          <li>Promote sustainable, seasonal, and zero-waste kitchen practices.</li>
        </ul>

        <h2>Meet the Team</h2>
        <ul className="team-list">
          <li>
            <strong>Daniyaal Mallick — Head Roaster</strong><br />
            With 10+ years in specialty coffee, Daniyaal brings out the best in every bean.
          </li>
          <li>
            <strong>Teri-Leigh Tenggren — Pastry Chef</strong><br />
            A Le Cordon Bleu-trained baker fusing Parisian technique with local ingredients.
          </li>
          <li>
            <strong>Junaid Fakier — Bakery Development Chef</strong><br />
            Creates new recipes and seasonal menus for our pâtisserie lineup.
          </li>
          <li>
            <strong>Mikaeel Musset — Quality Control Lead</strong><br />
            Oversees every roast and cupping session to ensure consistent excellence.
          </li>
          <li>
            <strong>Charity Bandta — Community Manager</strong><br />
            Ensuring your experience is as warm as your cappuccino.
          </li>
        </ul>
      </div>
    </section>
  );
}