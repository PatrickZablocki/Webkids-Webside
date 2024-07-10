import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./AboutUs.module.css";

const AboutUs = () => {
return (
    <div className={styles.Team_container}>
            <Link to="/navbar"> 
                    <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
            </Link>
            <h1 className={styles.headline}>Unser Team</h1>
            <div className={styles.Content_container}>
                <div className={styles.Member_container}>
                    <img className={styles.Member_image} src="https://avatars.githubusercontent.com/u/139169561?v=4" alt="" />
                        <h2>Asel</h2>
                    <div className={styles.Member_info}>
                        <p>Asel ist verantwortlich für die Veröffentlichung von Beiträgen und den Chat-Support innerhalb des Projekts.</p>
                    <ul>
                        <li>Chat Funktionalität</li>
                        <li>Beiträge Posten & Fotos Hochladen</li>
                    </ul>
                        <p>Das Backend für die Funktionen Übernommen</p>
                    </div>
                </div>
                <div className={styles.Member_container}>
                    <img className={styles.Member_image} src="https://avatars.githubusercontent.com/u/135116915?v=4" alt="" />
                        <h2>Timo</h2>
                    <div className={styles.Member_info}>
                        <p>Timo ist verantwortlich für Cookies und das Impressum innerhalb des Projekts.</p>
                    <ul>
                        <li>Cookie Funktion</li>
                        <li>Impressum</li>
                    </ul>
                    </div>
                </div>
                <div className={styles.Member_container}>
                    <img className={styles.Member_image} src="https://avatars.githubusercontent.com/u/139109232?v=4" alt="" />
                        <h2>Patrick</h2>
                    <div className={styles.Member_info}>
                    <p>Patrick war Team Lead und behielt alle Aufgaben im Blick, indem er diese verteilte. Seine Verantwortlichkeiten umfassten:</p>
                    <ul>
                        <li>Hauptnavigation (Navbar)</li>
                        <li>Login-Seite und Funktionalität</li>
                        <li>Registrierungsseite und Funktionalität</li>
                        <li>Erstellung und Bearbeitung von Profilen</li>
                        <li>Newsletter</li>
                    </ul>
                    <p>Darüber hinaus war er teilweise für das Backend zuständig.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;