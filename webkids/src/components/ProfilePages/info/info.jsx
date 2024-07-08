// import React, { useEffect, useState } from 'react';
// import styles from './info.module.css';
// import { Link } from 'react-router-dom';

// const Info = () => {
//     const [userData, setUserData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         birthdate: '',
//         profilePicture: ''
//     });
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch('/user', {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Netzwerkantwort war nicht OK');
//                 }
//                 const data = await response.json();
//                 setUserData(data);
//             } catch (error) {
//                 console.error('Fehler beim Abrufen der Benutzerdaten:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     const handleProfilePictureChange = (e) => {
//         const file = e.target.files[0];
//         setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
//     };

//     const handleSave = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('/user', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify(userData)
//             });
//             if (!response.ok) {
//                 throw new Error('Netzwerkantwort war nicht OK');
//             }
//             setEditMode(false);
//         } catch (error) {
//             console.error('Fehler beim Speichern der Benutzerdaten:', error);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.sidebar}>
//                 <div className={styles.sidebar_links}>
//                     <Link to="/beiträge">Beiträge</Link>
//                     <Link to="/info">Info</Link>
//                     <Link to="/freunde">Freunde</Link>
//                     <Link to="/fotos">Fotos</Link>
//                     <Link to="/videos">Videos</Link>
//                     <Link to="/besuche">Besuche</Link>
//                 </div>
//                 <Link to="/navbar"> 
//                     <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
//                 </Link>
//             </div>
//             <div className={styles.main_content}>
//                 <div className={styles.Info_container}>
//                     <h1 className={styles.Info_headline}>Deine Infos</h1>
//                     {editMode ? (
//                         <div className={styles.edit_form}>
//                             <label>
//                                 Vorname:
//                                 <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Nachname:
//                                 <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Email:
//                                 <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Geburtstag:
//                                 <input type="date" name="birthdate" value={userData.birthdate} onChange={handleInputChange} />
//                             </label>
//                             <label>
//                                 Profilbild:
//                                 <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
//                             </label>
//                             {userData.profilePicture && (
//                                 <img src={userData.profilePicture} alt="Profilbild" className={styles.profile_picture_preview} />
//                             )}
//                             <button onClick={handleSave}>Speichern</button>
//                             <button onClick={() => setEditMode(false)}>Abbrechen</button>
//                         </div>
//                     ) : (
//                         <div className={styles.user_info}>
//                             <p>Name: {userData.firstName} {userData.lastName}</p>
//                             <p>Email: {userData.email}</p>
//                             <p>Geburtstag: {userData.birthdate}</p>
//                             {userData.profilePicture && (
//                                 <img src={userData.profilePicture} alt="Profilbild" className={styles.profile_picture} />
//                             )}
//                             <button onClick={() => setEditMode(true)}>Bearbeiten</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Info;
import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import { Link } from 'react-router-dom';

const Info = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        profilePicture: ''
    });
    const [editMode, setEditMode] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, profilePicture: URL.createObjectURL(file) });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht OK');
            }
            setEditMode(false);
        } catch (error) {
            console.error('Fehler beim Speichern der Benutzerdaten:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_links}>
                    <Link to="/beiträge">Beiträge</Link>
                    <Link to="/info">Info</Link>
                    <Link to="/freunde">Freunde</Link>
                    <Link to="/fotos">Fotos</Link>
                    <Link to="/videos">Videos</Link>
                    <Link to="/besuche">Besuche</Link>
                </div>
                <Link to="/navbar"> 
                    <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
                </Link>
            </div>
            <div className={styles.main_content}>
                <div className={styles.Info_container}>
                    <h1 className={styles.Info_headline}>Deine Infos</h1>
                    {editMode ? (
                        <div className={styles.edit_form}>
                            <label>
                                Vorname:
                                <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
                            </label>
                            <label>
                                Nachname:
                                <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
                            </label>
                            <label>
                                Geburtstag:
                                <input type="date" name="birthdate" value={userData.birthdate} onChange={handleInputChange} />
                            </label>
                            <label>
                                Profilbild:
                                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                            </label>
                            {userData.profilePicture && (
                                <img src={userData.profilePicture} alt="Profilbild" className={styles.profile_picture_preview} />
                            )}
                            <button onClick={handleSave}>Speichern</button>
                            <button onClick={() => setEditMode(false)}>Abbrechen</button>
                        </div>
                    ) : (
                        <div className={styles.user_info}>
                            <p>Name: {userData.firstName} {userData.lastName}</p>
                            <p>Email: {userData.email}</p>
                            <p>Geburtstag: {userData.birthdate}</p>
                            {userData.profilePicture && (
                                <img src={userData.profilePicture} alt="Profilbild" className={styles.profile_picture} />
                            )}
                            <button onClick={() => setEditMode(true)}>Bearbeiten</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Info;
