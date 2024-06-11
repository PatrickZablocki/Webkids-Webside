import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import chat from './chat.module.css'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const user = {
        name: 'Profil',
        avatar: 'https://via.placeholder.com/40',
        status: ''
    };

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

    const handleSendMessage = async (message) => {
        try {
            const newMessage = { username: 'Your Username', message };
            await axios.post('http://localhost:5000/api/chat/messages', newMessage);
            fetchMessages();
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    return (
        <div  className={chat.main} >
            <ChatHeader user={user} />
            <ChatMessages messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};


export default Chat;