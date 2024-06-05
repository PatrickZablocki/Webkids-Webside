// import React, { useState, useEffect } from "react";
// import { faHome, faUserFriends, faEnvelope, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import styles from './Navbar.module.css';
// import { Newsletter } from './Newsletter/Newsletter';

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showNewsletter, setShowNewsletter] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const closeNewsletter = () => {
//     setShowNewsletter(false);
//   };

//   useEffect(() => {
//     setShowNewsletter(true);
//     fetchUserInfo();
//   }, []);

//   const fetchUserInfo = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const response = await fetch('http://localhost:5000/user', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setUser(data);
//         } else {
//           console.error('Failed to fetch user info:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/navbar');
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

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
//             <Link to="/navbar">Start</Link>
//           </span>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faUserFriends} />
//             <Link to="/navbar">Ihr Netzwerk</Link>
//           </span>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faEnvelope} />
//             <Link to="/navbar">Nachrichten</Link>
//           </span>
//           <span className={styles.icon}>
//             <FontAwesomeIcon icon={faBell} />
//             <Link to="/navbar">Mitteilungen</Link>
//           </span>
//           {user ? (
//             <div className={styles.dropdown_container}>
//             <span className={styles.profile_picture} onClick={toggleDropdown}>
//               {user.firstName} {user.lastName}
//             </span>
//             {showMenu && (
//               <div className={styles.dropdown_menu}>
//                 <li>
//                   <a href="">Konto</a>
//                   <a href="">Einstellungen & Datenschutz</a>
//                   <a href="">Hilfe</a>
//                 </li>
//                 <button onClick={handleLogout}>Logout</button>
//               </div>
//               )}
//             </div>
//           ) :(
//             <span className={styles.login_register}>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//               <li>
//                 <Link to="/register">Register</Link>
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
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Navbar.module.css';
import { Newsletter } from './Newsletter/Newsletter';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeNewsletter = () => {
    setShowNewsletter(false);
  };

  useEffect(() => {
    setShowNewsletter(true);
    fetchUserInfo();
  }, []);

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
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/navbar');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
            <Link to="/navbar">Start</Link>
          </span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faUserFriends} />
            <Link to="/navbar">Ihr Netzwerk</Link>
          </span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
            <Link to="/navbar">Nachrichten</Link>
          </span>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faBell} />
            <Link to="/navbar">Mitteilungen</Link>
          </span>
          {user ? (
            <div className={styles.dropdown_container}>
              <span className={styles.profile_picture} onClick={toggleDropdown}>
                {user.firstName} {user.lastName}
              </span>
              {showDropdown && (
                <div className={styles.dropdown_menu}>
                  <li>
                    <a href="">Konto</a>
                    <a href="">Einstellungen & Datenschutz</a>
                    <a href="">Hilfe</a>
                  </li>
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
                <Link to="/register">Register</Link>
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
