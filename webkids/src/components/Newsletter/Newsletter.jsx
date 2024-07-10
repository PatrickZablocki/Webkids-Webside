import React, { useState, useEffect } from 'react';
import styles from './Newsletter.module.css';

export const Newsletter = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const hasDismissed = localStorage.getItem('newsletterDismissed');
        if (!hasDismissed) {
            setShow(true);
        }
    }, []);

    const subscribeToNewsletter = async (email) => {
        try {
            const response = await fetch('http://localhost:5000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abonnieren des Newsletters');
            }

            const data = await response.json();
            setSuccess(data.message);
            setError('');
            localStorage.setItem('newsletterDismissed', 'true');
        } catch (error) {
            console.error('Fehler:', error);
            setError('Es gab ein Problem bei der Anmeldung. Bitte versuche es später erneut.');
        }
    };

    const declineNewsletter = async () => {
        try {
            const response = await fetch('http://localhost:5000/decline-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: '' }), // Leere E-Mail-Adresse oder gar keine E-Mail-Adresse übergeben
            });

            if (!response.ok) {
                throw new Error('Fehler beim Ablehnen des Newsletters');
            }

            setShow(false);
            localStorage.setItem('newsletterDismissed', 'true'); // Speichern Sie den Status im lokalen Speicher
        } catch (error) {
            console.error('Fehler:', error);
            setError('Es gab ein Problem beim Ablehnen. Bitte versuche es später erneut.');
        }
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        await subscribeToNewsletter(email);
        setShow(false);
    };

    const handleClose = async () => {
        await declineNewsletter(); // Übergabe der leeren E-Mail-Adresse
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.content}>
                    <div className={styles.logo_container}>
                        <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
                    </div>
                    <h2>Abonniere unseren Newsletter, um nichts zu verpassen</h2>
                    <form onSubmit={handleSubscribe}>
                        <input 
                            type="email" 
                            placeholder="E-Mail eingeben" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className={styles.subscribe}>Abonnieren</button>
                    </form>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <button onClick={handleClose} className={styles.close}>Ablehnen</button>
                    <p>Melde dich an, um exklusive Updates, spannende Neuigkeiten und besondere Angebote direkt in deinem Posteingang zu erhalten. Sei der Erste, der von unseren neuesten Inhalten und Aktionen erfährt!</p>
                </div>
            </div>
        </div>
    );
};

