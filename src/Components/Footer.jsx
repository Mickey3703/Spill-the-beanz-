import React from 'react';
import '../styles/headerstyle.css';

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Spill The Beanz. All rights reserved.</p>
    </footer>
  );
};

export default Footer;