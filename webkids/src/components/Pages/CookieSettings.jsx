import React from "react";
import styles from "./Pages.module.css";

const CookieSettings = () => {
  return (
    <div className={styles.page}>
      <h1>Cookie-Einstellungen</h1>
      <p>
        Auf dieser Seite können Sie Ihre Präferenzen für die Verwendung von
        Cookies auf unserer Website anpassen. Sie haben die Kontrolle darüber,
        welche Cookies wir verwenden dürfen und können Ihre Einstellungen
        jederzeit ändern.
      </p>

      <h2>Notwendige Cookies</h2>
      <p>
        Diese Cookies sind für das Funktionieren der Website unerlässlich und
        können in unseren Systemen nicht deaktiviert werden. Sie werden
        normalerweise nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt,
        wie z. B. das Festlegen Ihrer Datenschutzeinstellungen, das Einloggen
        oder das Ausfüllen von Formularen.
      </p>

      <h2>Performance-Cookies</h2>
      <p>
        Diese Cookies sammeln Informationen darüber, wie Besucher unsere Website
        nutzen, welche Seiten am häufigsten besucht werden und ob sie
        Fehlermeldungen von Webseiten erhalten. Diese Informationen helfen uns,
        die Leistung unserer Website zu verbessern.
      </p>

      <h2>Funktionale Cookies</h2>
      <p>
        Diese Cookies ermöglichen es der Website, erweiterte Funktionen und
        Personalisierung anzubieten. Sie können von uns oder von Drittanbietern,
        deren Dienste wir auf unseren Seiten hinzugefügt haben, gesetzt werden.
        Wenn Sie diese Cookies nicht zulassen, können einige oder alle dieser
        Dienste möglicherweise nicht ordnungsgemäß funktionieren.
      </p>

      <h2>Werbe-Cookies</h2>
      <p>
        Diese Cookies können über unsere Website von unseren Werbepartnern
        gesetzt werden. Sie können von diesen Unternehmen verwendet werden, um
        ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Werbung auf
        anderen Websites zu zeigen. Wenn Sie diese Cookies nicht zulassen,
        werden Sie weniger zielgerichtete Werbung erleben.
      </p>

      <h2>Cookie-Verwaltung</h2>
      <p>
        Sie können Ihre Cookie-Einstellungen über die Einstellungen Ihres
        Webbrowsers verwalten. Die meisten Webbrowser erlauben es Ihnen, Cookies
        zu steuern, indem Sie Ihre Cookie-Einstellungen direkt in den
        Browsereinstellungen ändern. Hier sind die Anweisungen zum Verwalten von
        Cookies in gängigen Webbrowsern:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647?hl=de"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/de-de/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Internet Explorer
          </a>
        </li>
        <li>
          <a
            href="https://privacy.microsoft.com/de-de/windows-10-microsoft-edge-and-privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>Weitere Informationen</h2>
      <p>
        Weitere Informationen über unsere Verwendung von Cookies und Ihre
        Wahlmöglichkeiten finden Sie in unserer{" "}
        <a href="/cookies">Cookie-Richtlinie</a> und{" "}
        <a href="/impressum">Datenschutzerklärung</a>.
      </p>
    </div>
  );
};

export default CookieSettings;
