import React, { useEffect, useState } from 'react';
import styles from './fotos.module.css';
import { Link } from 'react-router-dom';

const Fotos = () => {
    const [userData, setUserData] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

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

        const fetchPhotos = async () => {
            try {
                const response = await fetch('/photos');
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht OK');
                }
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Fotos:', error);
            }
        };

        fetchUserData();
        fetchPhotos();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const response = await fetch('/upload-photo', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht OK');
            }
            const data = await response.json();
            setPhotos([...photos, data.path]);
        } catch (error) {
            console.error('Fehler beim Hochladen des Fotos:', error);
        }
    };

    const handleDeletePhoto = async (photoToDelete) => {
        try {
            const response = await fetch(`/delete-photo/${photoToDelete}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht OK');
            }
            const updatedPhotos = photos.filter(photo => photo !== photoToDelete);
            setPhotos(updatedPhotos);
        } catch (error) {
            console.error('Fehler beim Löschen des Fotos:', error);
        }
    };

    return (
        <div>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_links}>
                    <Link to="/beiträge">Beiträge</Link>
                    <Link to="/info">Info</Link>
                    <Link to="/freunde">Freunde</Link>
                    <Link to="/fotos">Fotos</Link>
                    <Link to="/videos">Videos</Link>
                    <Link to="/besuche">Besuche</Link>
                </div>
            </div>
            <div className={styles.main_content}>
                <Link to="/navbar"> 
                    <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
                </Link>
                <div className={styles.Fotos_container}>
                    <h1 className={styles.Fotos_headline}>Deine Fotos</h1>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Foto hochladen</button>
                    <div className={styles.photos}>
                        {photos.map((photo, index) => (
                            <div key={index} className={styles.photoContainer}>
                                <img src={`/${photo}`} alt={`Foto ${index + 1}`} className={styles.photo} />
                                <button onClick={() => handleDeletePhoto(photo)}>Löschen</button>
                            </div>
                        ))}
                    </div>
                    {userData && (
                        <div className={styles.user_info}>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Fotos;