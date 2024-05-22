import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_content}>
        <div className={styles.logo_section}>
          <img
            src="/Logo/Logo_Webkids.png"
            alt="Logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.links_section}>
          <ul>
            <li>
              <Link to="/about">Über uns</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
            <li>
              <Link to="/privacy">Datenschutz</Link>
            </li>
            <li>
              <Link to="/terms">Nutzungsbedingungen</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <p>&copy; 2024 Webkids. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  );
};

export default Footer;
