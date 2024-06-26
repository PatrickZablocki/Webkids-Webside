import React, { useEffect, useState } from 'react';
import styles from './besuche.module.css';
import { Link } from 'react-router-dom';

const Besuche = () => {
    const [userData, setUserData] = useState(null);
    const [visitsCount, setVisitsCount] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht OK');
                }
                const data = await response.json();
                setUserData(data);

                // Profilbesuche abrufen
                if (data._id) {
                    const visitsResponse = await fetch(`/profile-visits/${data._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (!visitsResponse.ok) {
                        throw new Error('Netzwerkantwort für Profilbesuche war nicht OK');
                    }
                    const visitsData = await visitsResponse.json();
                    setVisitsCount(visitsData.visitsCount);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_links}>
                    <Link to="/beiträge">Beiträge</Link>
                    <Link to="/info">Info</Link>
                    <Link to="/freunde">Freunde</Link>
                    <Link to="/fotos">Fotos</Link>
                    <Link to="/videos">Videos</Link>
                    <Link to="/besuche">Besuche</Link>
                </div>
                <div className={styles.main_content}>
                    <Link to="/navbar">
                        <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
                    </Link>
                    <div className={styles.Besuche_container}>
                        <h1 className={styles.Besuche_headline}>Deine Besucher</h1>
                        {userData && (
                            <div className={styles.user_info}>
                                <p>Dein Profil wurde {visitsCount} mal besucht.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Besuche;