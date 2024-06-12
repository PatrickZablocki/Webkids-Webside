import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=""
                style={styles.input}
            />
            <button type="submit" style={styles.button}>Send</button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
        background: '#f0f0f0'
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginRight: '10px'
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        background: '#007bff',
        color: 'white',
        cursor: 'pointer'
    }
};

export default MessageInput;