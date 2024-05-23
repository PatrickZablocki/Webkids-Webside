import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./Login.module.css";

function Login() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    const handleLoginWithGoogle = () => {
        console.log('Anmeldung mit Google');
    };

    const handleLoginWithApple = () => {
        console.log('Anmeldung mit Apple');
    };

    return (
        <div className={styles.Login_container}>
            <div className={styles.Login_box}>
                <div className={styles.Login_content}>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="Username" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Anmelden</button>
                    </form>
                    <hr />
                    <div className={styles.Login_Social}>
                        <button className={styles.google_button} onClick={handleLoginWithGoogle}>
                            <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
                            Mit Google anmelden
                        </button>
                        <button className={styles.apple_button} onClick={handleLoginWithApple}>
                            <FontAwesomeIcon icon={faApple} className={styles.icon} />
                            Mit Apple anmelden
                        </button>
                    </div>
                    <hr/>
                    <div className={styles.Login_toRegister}>
                    <p>Du besitzt keinen Account? <Link to="/register">Registriere dich</Link></p>
                    </div>
                </div>
                <div className={styles.Login_image}></div>
            </div>
        </div>
    );
}

export default Login;