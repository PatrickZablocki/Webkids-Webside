import React, { useState, useEffect } from 'react';
import styles from './Newsletter.module.css';

export const Newsletter = ({ show, onClose }) => {
if (!show) {
    return null;
}

const handleSubscribe = (e) => {
    e.preventDefault();
    
    onClose();
};

return (
    <div className={styles.overlay}>
        <div className={styles.popup}>
            <div className={styles.content}>
            <div className={styles.logo_container}>
                <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
            </div>
            <h2>Abonniere unseren Newsletter,um nichts zu verpassen</h2>
            <form onSubmit={handleSubscribe}>
                <input type="email" placeholder="E-Mail eingeben" required />
                <button type="submit" className={styles.subscribe}>Abonnieren</button>
            </form>
                <button onClick={onClose} className={styles.close}>Schließen</button>
                <p>Melde dich an, um exklusive Updates, spannende Neuigkeiten und besondere Angebote direkt in deinem Posteingang zu erhalten. Sei der Erste, der von unseren neuesten Inhalten und Aktionen erfährt!</p>
            </div>
        </div>
    </div>
    );
}