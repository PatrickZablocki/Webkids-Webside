import React from "react";
import styles from "./Pages.module.css";

const Impressum = () => {
  return (
    <div className={styles.page}>
      <h1>Impressum/Nutzungsbedingungen</h1>
      <h2>Impressum</h2>
      <p>
        <strong>Webkids GmbH</strong>
        <br />
        Straße der Programmierer 1<br />
        12345 Geheim
        <br />
        Deutschland
        <br />
      </p>
      <p>
        <strong>Vertreten durch:</strong>
        <br />
        Geschäftsführer: Webkids
        <br />
      </p>
      <p>
        <strong>Kontakt:</strong>
        <br />
        Telefon: +49 123 456789
        <br />
        E-Mail: info@webkids.de
        <br />
      </p>
      <p>
        <strong>Registereintrag:</strong>
        <br />
        Eintragung im Handelsregister.
        <br />
        Registergericht: Amtsgericht Geheim
        <br />
        Registernummer: HRB 123456
        <br />
      </p>
      <p>
        <strong>Umsatzsteuer-ID:</strong>
        <br />
        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
        DE123456789
        <br />
      </p>
      <p>
        <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
        <br />
        Webkids
        <br />
        Straße der Programmierer 1<br />
        12345 Geheim
        <br />
        Deutschland
        <br />
      </p>
      <h2>Nutzungsbedingungen</h2>
      <p>
        <strong>1. Allgemeines</strong>
        <br />
        Diese Nutzungsbedingungen gelten für die Nutzung der Website Webkids.
        Durch die Nutzung unserer Website erklären Sie sich mit diesen
        Nutzungsbedingungen einverstanden. Wenn Sie nicht an diese Bedingungen
        gebunden sein möchten, sollten Sie unsere Website nicht nutzen.
      </p>
      <p>
        <strong>2. Inhalte und Dienste</strong>
        <br />
        Die auf unserer Website angebotenen Inhalte und Dienste sind
        urheberrechtlich geschützt. Sie dürfen diese Inhalte nicht ohne unsere
        ausdrückliche Zustimmung verwenden, vervielfältigen oder verbreiten.
      </p>
      <p>
        <strong>3. Haftung</strong>
        <br />
        Wir bemühen uns, die Richtigkeit und Aktualität der auf unserer Website
        bereitgestellten Informationen sicherzustellen. Trotzdem können wir
        keine Garantie für die Richtigkeit, Vollständigkeit und Aktualität der
        Inhalte übernehmen. Jegliche Haftung für Schäden, die direkt oder
        indirekt aus der Nutzung unserer Website entstehen, ist ausgeschlossen.
      </p>
      <p>
        <strong>4. Datenschutz</strong>
        <br />
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Informationen
        zur Verarbeitung Ihrer Daten finden Sie in unserer{" "}
        <a href="/datenschutzerklaerung">Datenschutzerklärung</a>.
      </p>
      <p>
        <strong>5. Änderungen der Nutzungsbedingungen</strong>
        <br />
        Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu
        ändern. Die jeweils aktuelle Version ist auf unserer Website verfügbar.
        Bitte überprüfen Sie diese Seite regelmäßig auf Änderungen.
      </p>
      <p>
        <strong>6. Anwendbares Recht</strong>
        <br />
        Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist,
        soweit gesetzlich zulässig, Musterstadt.
      </p>
      <p>
        <strong>7. Kontakt</strong>
        <br />
        Bei Fragen zu diesen Nutzungsbedingungen wenden Sie sich bitte an:
        info@webkids.de
      </p>
    </div>
  );
};

export default Impressum;
