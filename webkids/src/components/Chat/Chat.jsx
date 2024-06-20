import React, { useState, useEffect, useCallback } from 'react';
import styles from './chat.module.css';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const Chat = () => {
    const currentUser = { _id: '1', name: 'Current User' };
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);

    const fetchMessages = useCallback(async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`http://localhost:5000/api/chat/messages/${currentUser._id}/${selectedUser._id}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                setMessages([]);
                console.error('Received data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    }, [currentUser._id, selectedUser]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/chat/users?currentUserId=${currentUser._id}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]);
                console.error('Received data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    }, [currentUser._id]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage) return;

        const messageData = {
            senderId: currentUser._id,
            receiverId: selectedUser._id,
            content: newMessage,
        };

        try {
            const response = await fetch('http://localhost:5000/api/chat/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            const data = await response.json();
            if (data && data._id) {
                setMessages([data, ...messages]);
            } else {
                console.error('Invalid response data:', data);
            }
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (!Array.isArray(users)) {
        return <div className="alert alert-danger">Error: users is not an array.</div>;
    }

    return (
        <Container fluid className={`d-flex flex-column vh-100 ${styles.chatContainer}`}>
            {/* Header with the selected user */}
            <Row className={`bg-light p-3 border-bottom ${styles.chatHeader}`}>
                <Col>
                    <Form.Select
                        onChange={(e) => {
                            const selected = users.find(user => user._id === e.target.value);
                            setSelectedUser(selected);
                        }}
                        value={selectedUser ? selectedUser._id : ''}
                    >
                        <option value="">Выберите пользователя</option>
                        {users.filter(user => user._id !== currentUser._id).map(user => (
                            <option key={user._id} value={user._id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {/* Chat body */}
            <Row className={`flex-grow-1 overflow-auto ${styles.chatBody}`}>
                <Col> <ListGroup variant="flush">
                    {Array.isArray(messages) && messages.map((message) => (
                        <ListGroup.Item key={message._id} className={message.senderId === currentUser._id ? styles.sentMessage : styles.receivedMessage}>
                            <strong>{message.senderId === currentUser._id ? 'Вы' : selectedUser?.firstName}:</strong> {message.content}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </Col>
            </Row>

            {/* Message input */}
            <Row className={`bg-light p-3 border-top ${styles.chatInput}`}>
                <Col>
                    <Form onSubmit={handleSendMessage}>
                        <Form.Group controlId="messageInput" className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Введите сообщение..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className={styles.inputField}
                                disabled={!selectedUser}
                            />
                            <Button type="submit" className={`ms-2 ${styles.sendButton}`} disabled={!selectedUser}>Отправить</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;