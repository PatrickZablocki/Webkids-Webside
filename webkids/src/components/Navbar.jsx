import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faEnvelope, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const isLoggedIn = false;

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className={styles.Navbar_container}>
            <img src="/Logo/Logo_Webkids.png" alt="Logo" className={styles.logo} />

            <div className={styles.search_bar}>
                <input type="text" placeholder="Suche..." />
                <button>Suchen</button>
            </div>

            <div className={`${styles.nav_icons} ${showMenu ? styles.show : ''}`}>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faHome} />
                    <Link to="/">Start</Link>
                </span>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faUserFriends} />
                    <Link to="/about">Ihr Netzwerk</Link>
                </span>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <Link to="/contact">Nachrichten</Link>
                </span>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faBell} />
                    <Link to="/notifications">Mitteilungen</Link>
                </span>
                {isLoggedIn ? (
                    <span className={styles.profile_picture}>
                        
                    </span>
                ) : (
                    <span className={styles.login_register}>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </span>
                )}
            </div>

            <div className={styles.menu_icon} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    );
};

export default Navbar;