import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="footerYear">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;