import React, { useEffect, useState } from 'react';
import styles from './videos.module.css';
import { Link } from 'react-router-dom';

const Videos = () => {
    const [userData, setUserData] = useState(null);
    const [videos, setVideos] = useState([]);
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

                const videosResponse = await fetch('/videos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!videosResponse.ok) {
                    throw new Error('Netzwerkantwort war nicht OK');
                }
                const videosData = await videosResponse.json();
                setVideos(videosData);
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzerdaten:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('video', selectedFile);

        try {
            const response = await fetch('/upload-video', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht OK');
            }
            const data = await response.json();
            alert(data.message);
            setVideos(prevVideos => [...prevVideos, data.path]);
        } catch (error) {
            console.error('Fehler beim Hochladen des Videos:', error);
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
                <div className={styles.main_content}>
                    <Link to="/navbar">
                        <img src="/Logo/Logo_Webkids1.webp" alt="Logo" className={styles.logo} />
                    </Link>
                    <div className={styles.Videos_container}>
                        <h1 className={styles.Videos_headline}>Deine Videos</h1>
                        {userData && (
                            <div className={styles.user_info}>
                                <form onSubmit={handleUpload}>
                                    <input type="file" accept="video/*" onChange={handleFileChange} />
                                    <button type="submit">Video hochladen</button>
                                </form>
                                <div className={styles.video_list}>
                                    {videos.map((video, index) => (
                                        <div key={index} className={styles.video_item}>
                                            <video width="320" height="240" controls>
                                                <source src={`/${video}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Videos;