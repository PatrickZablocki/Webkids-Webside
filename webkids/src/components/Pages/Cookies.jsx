import React from "react";
import { Link } from "react-router-dom";
import styles from "./Pages.module.css";

const Cookies = () => {
  return (
    <div className={styles.page}>
      <Link to="/navbar" className={styles.logoLink}>
      <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
      </Link>
      <h1>Cookie-Richtlinie</h1>
      <p>
        Diese Cookie-Richtlinie erklärt, was Cookies sind und wie wir sie
        verwenden. Sie sollten diese Richtlinie lesen, um zu verstehen, welche
        Art von Cookies wir verwenden, welche Informationen wir mit Cookies
        sammeln und wie diese Informationen verwendet werden. Durch die Nutzung
        dieser Website stimmen Sie der Verwendung von Cookies gemäß dieser
        Richtlinie zu.
      </p>

      <h2>Was sind Cookies?</h2>
      <p>
        Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden,
        wenn Sie eine Website besuchen. Sie helfen dabei, Ihre Präferenzen und
        Aktivitäten zu speichern, um Ihre Benutzererfahrung zu verbessern.
        Cookies können "persistente" Cookies oder "Session"-Cookies sein.
        Persistente Cookies bleiben auf Ihrem Computer oder Mobilgerät, wenn Sie
        offline gehen, während Session-Cookies gelöscht werden, sobald Sie Ihren
        Webbrowser schließen.
      </p>

      <h2>Wie verwenden wir Cookies?</h2>
      <p>
        Wir verwenden Cookies aus verschiedenen Gründen, die im Folgenden
        beschrieben werden. Leider gibt es in den meisten Fällen keine
        branchenüblichen Optionen zum Deaktivieren von Cookies, ohne die von
        ihnen bereitgestellten Funktionen und Merkmale vollständig zu
        deaktivieren. Es wird empfohlen, alle Cookies aktiviert zu lassen, wenn
        Sie sich nicht sicher sind, ob Sie sie benötigen oder nicht, falls sie
        verwendet werden, um einen von Ihnen genutzten Dienst bereitzustellen.
      </p>

      <h2>Arten von Cookies, die wir verwenden</h2>
      <ul>
        <li>
          <strong>Notwendige Cookies:</strong> Diese Cookies sind unerlässlich,
          um Ihnen Dienste auf unserer Website bereitzustellen und einige ihrer
          Funktionen zu nutzen, wie z.B. den Zugang zu sicheren Bereichen.
        </li>
        <li>
          <strong>Performance-Cookies:</strong> Diese Cookies sammeln
          Informationen darüber, wie Besucher unsere Website nutzen, welche
          Seiten am häufigsten besucht werden und ob sie Fehlermeldungen von
          Webseiten erhalten. Diese Cookies sammeln keine Informationen, die
          einen Besucher identifizieren.
        </li>
        <li>
          <strong>Funktionale Cookies:</strong> Diese Cookies ermöglichen es
          uns, die Entscheidungen, die Sie auf unserer Website treffen (wie z.B.
          Ihren Benutzernamen, Ihre Sprache oder die Region, in der Sie sich
          befinden), zu speichern und verbesserte, persönlichere Funktionen
          bereitzustellen.
        </li>
        <li>
          <strong>Werbe-Cookies:</strong> Diese Cookies werden verwendet, um
          Ihnen Werbung anzuzeigen, die für Sie und Ihre Interessen relevant
          ist. Sie werden auch verwendet, um die Anzahl der Male zu begrenzen,
          die Sie eine Anzeige sehen, sowie um die Effektivität der
          Werbekampagne zu messen.
        </li>
      </ul>

      <h2>Ihre Wahlmöglichkeiten bezüglich Cookies</h2>
      <p>
        Sie haben das Recht, zu entscheiden, ob Sie Cookies akzeptieren oder
        ablehnen möchten. Sie können Ihre Cookie-Einstellungen jederzeit ändern,
        indem Sie auf den entsprechenden Link in der Fußzeile unserer Website
        klicken. Sie können Ihre Webbrowser-Einstellungen ändern, um Cookies zu
        akzeptieren oder abzulehnen. Wenn Sie sich entscheiden, Cookies
        abzulehnen, können Sie unsere Website weiterhin nutzen, jedoch kann Ihr
        Zugriff auf einige Funktionen und Bereiche unserer Website eingeschränkt
        sein.
      </p>

      <h2>Weitere Informationen</h2>
      <p>
        Weitere Informationen darüber, wie wir Ihre persönlichen Daten
        verwenden, speichern und schützen, finden Sie in unserer{" "}
        <a href="/impressum">Datenschutzerklärung</a>.
      </p>
    </div>
  );
};

export default Cookies;
