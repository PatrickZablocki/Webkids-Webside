import React, { useState, useEffect } from 'react';
import axios from 'axios';
import chat from './chat.module.css'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/chat/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMessage = { username, message };
            await axios.post('http://localhost:5000/api/chat/messages', newMessage);
            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    return (
        <div className={chat.main} >
            <h1>Chat</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    required
                />
                <button type="submit">Send</button>
            </form>
            <div>
                {messages.map((msg) => (
                    <div key={msg._id}>
                        <strong>{msg.username}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;