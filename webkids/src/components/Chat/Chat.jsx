import React, { useState, useEffect } from 'react';
import chat from './chat.module.css'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/chat/messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async () => {
        if (message.trim() && user.trim()) {
            try {
                const response = await fetch('http://localhost:5000/api/chat/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user, message }),
                });

                if (response.ok) {
                    const newMessage = await response.json();
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                    setMessage('');
                } else {
                    console.error('Failed to send message:', response.statusText);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className={chat.chatContainer} >
            <h1>Chat App</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Your name" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)} 
                />
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}: </strong>{msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;