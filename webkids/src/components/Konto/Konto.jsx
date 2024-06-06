import React, { useEffect, useState } from 'react';
import styles from './Konto.module.css';
import { Link } from 'react-router-dom';

const Konto = () => {
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
            <Link to="/navbar"> 
                <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
            </Link>
            <div className={styles.Konto_container}>
                <h1 className={styles.Konto_headline}>Dein Konto</h1>
                {userData && (
                    <div className={styles.user_info}>
                        <p>Name: {userData.firstName} {userData.lastName}</p>
                        <p>Email: {userData.email}</p>
                        <p>Geburtstag: {userData.birthdate}</p>
                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default Konto;