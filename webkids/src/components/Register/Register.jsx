import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
    const navigate = useNavigate();
    const [birthdate, setBirthdate] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('Registration successful');
        navigate('/login');
    };

    const handleLoginWithGoogle = () => {
        console.log('Anmeldung mit Google');
    };

    const handleLoginWithApple = () => {
        console.log('Anmeldung mit Apple');
    };

    return (
        <div className={styles.Register_container}>
            <div className={styles.Register_box}>
                <div className={styles.Register_image}></div>
                <div className={styles.Register_content}>
                    <h1>Registrieren</h1>
                    <form onSubmit={handleRegister}>
                        <input type="text" placeholder="Username" required />
                        <input type="text" placeholder="Vorname" required />
                        <input type="text" placeholder="Nachname" required />
                        <label>Geburtsdatum:</label>
                        <input 
                            type="date" 
                            value={birthdate} 
                            onChange={(e) => setBirthdate(e.target.value)} 
                            required 
                        />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Registrieren</button>
                    </form>
                    <hr />
                    <div className={styles.Register_Social}>
                        <button className={styles.google_button} onClick={handleLoginWithGoogle}>
                            <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
                            Mit Google registrieren
                        </button>
                        <button className={styles.apple_button} onClick={handleLoginWithApple}>
                            <FontAwesomeIcon icon={faApple} className={styles.icon} />
                            Mit Apple registrieren
                        </button>
                    </div>
                    <hr/>
                    <div className={styles.Register_toRegister}>
                        <p>Du besitzt bereits einen Account? <Link to="/login">Anmelden</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;