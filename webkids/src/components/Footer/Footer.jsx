import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";
    setCookiesAccepted(cookiesAccepted);
  }, []);

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_content}>
        <div className={styles.logo_section}>
          <img
            src="/Logo/Logo_Webkids.png"
            alt="Webkids Logo"
            className={styles.logo}
          />
        </div>
        <nav className={styles.links_section} aria-label="Footer navigation">
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
            <li>
              <Link to="/cookies">Cookies</Link>
            </li>
            <li>
              <Link to="/cookie-settings">Cookie-Einstellungen</Link>
            </li>
            <li>
              <Link to="/impressum">Impressum/Nutzungsbedingungen</Link>
            </li>
            <li>
              <Link to="/help">Hilfe</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.footer_bottom}>
        <p>Webkids &copy; 2024. Alle Rechte vorbehalten.</p>
      </div>
      {!cookiesAccepted && (
        <div className={styles.cookie_banner}>
          <p>
            Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die
            Nutzung unserer Website stimmen Sie unserer Cookie-Richtlinie zu.
          </p>
          <button onClick={handleAcceptCookies}>Akzeptieren</button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
