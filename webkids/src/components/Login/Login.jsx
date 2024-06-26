import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful');
                localStorage.setItem('token', data.token);
                fetchUserInfo(); // Benutzerdaten sofort abrufen nach erfolgreichem Login
                navigate('/navbar'); // Navigiert nach erfolgreicher Anmeldung zur Navbar
            } else {
                setError(data.message);
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:5000/user', { 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log('User data:', userData);
                } else {
                    console.error('Failed to fetch user info:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }
    };

    const handleLoginWithGoogle = () => {
        console.log('Login with Google');
    };

    const handleLoginWithApple = () => {
        console.log('Login with Apple');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={styles.Login_container}>
            <Link to="/navbar" className={styles.logoLink}>
                <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
            </Link>
            <div className={styles.Login_box}>
                <div className={styles.Login_content}>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className={styles.passwordContainer}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEye : faEyeSlash}
                                onClick={togglePasswordVisibility}
                                className={styles.eyeIcon}
                            />
                        </div>
                        <button type="submit">Anmelden</button>
                    </form>
                    {error && <p className={styles.error}>{error}</p>}
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
                    <hr />
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