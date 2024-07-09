import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.footerLogo}/>
        <ul>
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
          <li>
            <Link to="/datenschutzerklaerung">Datenschutzerklärung</Link>
          </li>
          <li>
            <Link to="/AboutUs">Über Uns</Link>
          </li>
        </ul>
      </div>
      <div>Webkids © 2024</div>
    </footer>
  );
};

export default Footer;
