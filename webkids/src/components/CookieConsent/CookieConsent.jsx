import React, { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const setCookies = () => {
    document.cookie = "necessaryCookie1=value1; path=/; max-age=31536000";
    // Weitere Cookies hier setzen
  };

  const clearCookies = () => {
    document.cookie = "necessaryCookie1=; path=/; max-age=0";
    // Weitere Cookies hier löschen
  };

  const handleAccept = () => {
    setShowPopup(false);
    setCookies();
  };

  const handleDecline = () => {
    setShowPopup(false);
    clearCookies();
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.content}>
          <h2>Cookie-Hinweis</h2>
          <p>
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf
            unserer Website zu bieten. Durch die weitere Nutzung dieser Website
            stimmen Sie der Verwendung von Cookies zu. Weitere Informationen
            finden Sie in unserer{" "}
            <a href="/datenschutzerklaerung">Datenschutzerklärung</a>.
          </p>
          <div className={styles.actions}>
            <button onClick={handleAccept} className={styles.accept}>
              Akzeptieren
            </button>
            <button onClick={handleDecline} className={styles.decline}>
              Ablehnen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
