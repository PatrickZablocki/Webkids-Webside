import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cookies from "./components/Pages/Cookies";
import CookieSettings from "./components/Pages/CookieSettings";
import Impressum from "./components/Pages/Impressum";
import Help from "./components/Pages/Help";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.App} id="root">
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<div>Home Inhalt</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/cookie-settings" element={<CookieSettings />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/help" element={<Help />} />
            <Route path="/datenschutzerklaerung" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
