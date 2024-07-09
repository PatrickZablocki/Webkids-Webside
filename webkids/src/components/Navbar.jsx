// import React, { useState, useEffect } from "react";
// import { faHome, faUserFriends, faEnvelope, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import styles from './Navbar.module.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Newsletter } from './Newsletter/Newsletter';

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showNewsletter, setShowNewsletter] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/navbar');
//   };

//   const closeNewsletter = () => {
//     setShowNewsletter(false);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUserInfo();
//     }
//   }, []);

//   const fetchUserInfo = async () => {
//     try {
//       const response = await fetch('/user', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       } else {
//         throw new Error('Failed to fetch user information');
//       }
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         fetchUserInfo();
//       } else {
//         setUser(null);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Hier stelle ich ein das die Navbar in den folgenden Components nicht angezeigt wird
//   const routesWithoutNavbar =
//     ['/login', '/register', '/konto', '/info',
//       '/freunde', '/fotos', '/videos', '/besuche', '/help', '/datenschutzerklaerung',
//       '/cookies', '/cookie-settings', '/impressum', '/beiträge',
//     ];
//   const isRouteWithoutNavbar = routesWithoutNavbar.includes(location.pathname);

//   if (isRouteWithoutNavbar) {
//     return null;
//   }

//   return (
//     <div>
//       <div className={styles.Navbar_container}>
//         <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />

//         <div className={styles.search_bar}>
//           <input type="text" placeholder="Suche..." />
//           <button>Suchen</button>
//         </div>

//         <div className={`${styles.nav_icons} ${showMenu ? styles.show : ""}`}>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faHome} />
//             <Link to="/">Start</Link>
//           </span>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faUserFriends} />
//             <Link to="/navbar">Ihr Netzwerk</Link>
//           </span>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faEnvelope} />
//             <Link to="/messages">Nachrichten</Link>
//           </span>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faBell} />
//             <Link to="/notifications">Mitteilungen</Link>
//           </span>
//           {user ? (
//             <div className={styles.dropdown_container}>
//               <span className={styles.profile_picture} onClick={toggleDropdown}>
//                 {user.firstName} {user.lastName}
//               </span>
//               {showDropdown && (
//                 <div className={styles.dropdown_menu}>
//                   <Link to="/konto" className={styles.dropdown_link}>Konto</Link>
//                   <Link to="/datenschutzerklaerung" className={styles.dropdown_link}>Einstellungen & Datenschutz</Link>
//                   <Link to="/help" className={styles.dropdown_link}>Hilfe</Link>
//                   <button onClick={handleLogout}>Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span className={styles.login_register}>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//               <li>
//                 <Link to="/register">Registrieren</Link>
//               </li>
//             </span>
//           )}
//         </div>

//         <div className={styles.menu_icon} onClick={toggleMenu}>
//           <FontAwesomeIcon icon={faBars} />
//         </div>
//       </div>
//       <Newsletter show={showNewsletter} onClose={closeNewsletter} userEmail={user ? user.email : ''} />
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { faHome, faUserFriends, faEnvelope, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Newsletter } from './Newsletter/Newsletter';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/navbar');
  };

  const closeNewsletter = () => {
    setShowNewsletter(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo();
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error('Failed to fetch user information');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserInfo();
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Hier stelle ich ein das die Navbar in den folgenden Components nicht angezeigt wird
  const routesWithoutNavbar =
    ['/login', '/register', '/konto', '/info',
      '/freunde', '/fotos', '/videos', '/besuche', '/help', '/datenschutzerklaerung',
      '/cookies', '/cookie-settings', '/impressum', '/beiträge', '/AboutUs',
    ];
  const isRouteWithoutNavbar = routesWithoutNavbar.includes(location.pathname);

  if (isRouteWithoutNavbar) {
    return null;
  }

  return (
    <div>
      <div className={styles.Navbar_container}>
        <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />

        <div className={styles.search_bar}>
          <input type="text" placeholder="Suche..." />
          <button>Suchen</button>
        </div>

        <div className={`${styles.nav_icons} ${showMenu ? styles.show : ""}`}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faHome} />
            <Link to="/">Start</Link>
          </span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faUserFriends} />
            <Link to="/navbar">Ihr Netzwerk</Link>
          </span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
            <Link to="/messages">Nachrichten</Link>
          </span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faBell} />
            <Link to="/notifications">Mitteilungen</Link>
          </span>
          {user ? (
            <div className={styles.dropdown_container}>
              <span className={styles.profile_picture} onClick={toggleDropdown}>
                {user.firstName} {user.lastName}
              </span>
              {showDropdown && (
                <div className={styles.dropdown_menu}>
                  <Link to="/konto" className={styles.dropdown_link}>Konto</Link>
                  <Link to="/datenschutzerklaerung" className={styles.dropdown_link}>Einstellungen & Datenschutz</Link>
                  <Link to="/help" className={styles.dropdown_link}>Hilfe</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <span className={styles.login_register}>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Registrieren</Link>
              </li>
            </span>
          )}
        </div>

        <div className={styles.menu_icon} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <Newsletter show={showNewsletter} onClose={closeNewsletter} userEmail={user ? user.email : ''} />
    </div>
  );
};

export default Navbar;