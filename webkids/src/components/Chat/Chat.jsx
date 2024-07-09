// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [user, setUser] = useState('');

//     useEffect(() => {
//         // Получить предыдущие сообщения
//         socket.on('previousMessages', (previousMessages) => {
//             setMessages(previousMessages);
//         });

//         // Получать новые сообщения
//         socket.on('message', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         return () => {
//             socket.off('previousMessages');
//             socket.off('message');
//         };
//     }, []);

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (newMessage && user) {
//             const messageData = { user, message: newMessage, timestamp: new Date() };
//             socket.emit('message', messageData);
//             setNewMessage('');
//         }
//     };

//     return (
//         <div>
//             <h1>Chat Room</h1>
//             <div className="messages">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="message">
//                         <strong>{msg.user}: </strong> {msg.message} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={sendMessage} className="message-form">
//                 <input
//                     type="text"
//                     value={user}
//                     onChange={(e) => setUser(e.target.value)}
//                     placeholder="Your name"
//                     required
//                 />
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Your message"
//                     required
//                 />
//                 <button type="submit">Send</button>
//             </form>
//             <style jsx>{`
//                 .messages {
//                     border: 1px solid #ccc;
//                     padding: 10px;
//                     margin-bottom: 10px;
//                     height: 300px;
//                     overflow-y: scroll;
//                     margin-top:120px;
//                 }
//                 .message {
//                     padding: 5px 0;
//                 }
//                 .message-form {
//                     display: flex;
//                     flex-direction: column;
//                 }
//                 .message-form input {
//                     margin-bottom: 5px;
//                     padding: 8px;
//                     border: 1px solid #ccc;
//                     border-radius: 4px;
//                 }
//                 .message-form button {
//                     padding: 10px;
//                     border: none;
//                     background-color: #007bff;
//                     color: white;
//                     border-radius: 4px;
//                     cursor: pointer;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Chat;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [sender, setSender] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000')
//       .then((response) => response.json())
//       .then((data) => setMessages(data));

//     socket.on('output-messages', (data) => {
//       setMessages(data);
//     });

//     socket.on('message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     socket.emit('chatMessage', { message, sender });
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>Chat App</h1>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           value={sender}
//           onChange={(e) => setSender(e.target.value)}
//           placeholder="Your name"
//         />
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Your message"
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default App;
