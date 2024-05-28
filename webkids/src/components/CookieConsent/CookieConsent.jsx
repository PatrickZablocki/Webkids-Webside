import React, { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    }
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
    localStorage.setItem("cookieConsent", "accepted");
    setShowPopup(false);
    setCookies();
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
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
            Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.
            Einige Cookies sind notwendig für das Funktionieren der Website,
            andere helfen uns, das Nutzerverhalten zu analysieren oder Inhalte
            zu personalisieren. Sie können selbst entscheiden, welche Cookies
            Sie zulassen möchten.
          </p>
          <div className={styles.actions}>
            <button onClick={handleAccept} className={styles.accept}>
              Akzeptieren
            </button>
            <button onClick={handleDecline} className={styles.decline}>
              Ablehnen
            </button>
          </div>
          <p>
            Weitere Informationen finden Sie in unserer{" "}
            <a href="/datenschutzerklaerung">Datenschutzerklärung</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
