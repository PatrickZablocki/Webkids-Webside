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
import Homepage from "./components/Homepage/Homepage";
import Chat from "./components/Chat/Chat";
import { Newsletter } from "./components/Newsletter/Newsletter";
import Konto from "./components/Konto/Konto";
import Beiträge from "./components/ProfilePages/Beiträge/Beiträge";
import Info from "./components/ProfilePages/info/info";
import Freunde from "./components/ProfilePages/freunde/freunde";
import Fotos from "./components/ProfilePages/fotos/fotos";
import Videos from "./components/ProfilePages/videosPage/Videos";
import Besuche from "./components/ProfilePages/besuche/besuche";

function App() {
  return (
    <Router>
      <div className={styles.App} id="root">
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/messages" element={<Chat />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/cookie-settings" element={<CookieSettings />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/help" element={<Help />} />
            <Route path="/datenschutzerklaerung" element={<PrivacyPolicy />} />
            <Route path="/konto" element={<Konto />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/beiträge" element={<Beiträge />} />
            <Route path="/info" element={<Info />} />
            <Route path="/freunde" element={<Freunde />} />
            <Route path="/fotos" element={<Fotos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/besuche" element={<Besuche />} />
          </Routes>
        </div>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;