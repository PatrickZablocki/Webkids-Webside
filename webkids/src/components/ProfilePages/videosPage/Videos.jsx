import React, { useEffect, useState } from 'react';
import styles from './videos.module.css';
import { Link } from 'react-router-dom';

const Videos = () => {
    const [userData, setUserData] = useState(null);

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
                <div className={styles.Videos_container}>
                    <h1 className={styles.Videos_headline}>Deine Videos</h1>
                    {userData && (
                        <div className={styles.user_info}>
                            
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
)
}

export default Videos