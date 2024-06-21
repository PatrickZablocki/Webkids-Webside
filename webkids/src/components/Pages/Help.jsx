import React from "react";
import { Link } from "react-router-dom";
import styles from "./Pages.module.css";

const Help = () => {
  return (
    <div className={styles.page}>
      <Link to="/navbar" className={styles.logoLink}>
      <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
      </Link>
      <h1>Hilfe</h1>
      <p>
        Willkommen im Hilfe-Bereich von Webkids. Hier finden Sie Antworten auf
        häufig gestellte Fragen und können sich bei Problemen oder Fragen an
        unser Support-Team wenden.
      </p>

      <h2>Häufig gestellte Fragen (FAQ)</h2>
      <h3>1. Wie kann ich ein Konto erstellen?</h3>
      <p>
        Um ein Konto zu erstellen, klicken Sie auf der Startseite auf
        "Registrieren" und folgen Sie den Anweisungen. Sie benötigen eine
        gültige E-Mail-Adresse und müssen ein sicheres Passwort wählen.
      </p>

      <h3>2. Ich habe mein Passwort vergessen. Was soll ich tun?</h3>
      <p>
        Wenn Sie Ihr Passwort vergessen haben, klicken Sie auf der Login-Seite
        auf "Passwort vergessen". Geben Sie Ihre E-Mail-Adresse ein und wir
        senden Ihnen Anweisungen zum Zurücksetzen Ihres Passworts.
      </p>

      <h3>3. Wie kann ich meine Profildaten aktualisieren?</h3>
      <p>
        Um Ihre Profildaten zu aktualisieren, loggen Sie sich ein und gehen Sie
        zu "Mein Profil". Dort können Sie Ihre persönlichen Daten ändern und
        speichern.
      </p>

      <h3>4. Wie kann ich mein Konto löschen?</h3>
      <p>
        Wenn Sie Ihr Konto löschen möchten, kontaktieren Sie bitte unseren
        Support. Beachten Sie, dass das Löschen Ihres Kontos nicht rückgängig
        gemacht werden kann.
      </p>

      <h2>Kontakt zum Support</h2>
      <p>
        Wenn Sie weitere Fragen haben oder Unterstützung benötigen, können Sie
        sich jederzeit an unser Support-Team wenden:
      </p>
      <ul>
        <li>
          <strong>E-Mail:</strong> support@webkids.de
        </li>
        <li>
          <strong>Telefon:</strong> +49 123 456789
        </li>
        <li>
          <strong>Supportzeiten:</strong> Montag bis Freitag, 9:00 - 18:00 Uhr
        </li>
      </ul>

      <h2>Nützliche Links</h2>
      <p>Hier sind einige Links, die Ihnen weiterhelfen können:</p>
      <ul>
        <li>
          <a href="/datenschutzerklaerung">Datenschutzerklärung</a>
        </li>
        <li>
          <a href="/impressum">Impressum</a>
        </li>
        <li>
          <a href="/cookie-settings">Cookie-Einstellungen</a>
        </li>
      </ul>
    </div>
  );
};

export default Help;
