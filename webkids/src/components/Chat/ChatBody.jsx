// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [user, setUser] = useState("");

//   useEffect(() => {
//     // Получить предыдущие сообщения
//     socket.on("previousMessages", (previousMessages) => {
//       setMessages(previousMessages);
//     });

//     // Получать новые сообщения
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("previousMessages");
//       socket.off("message");
//     };
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage && user) {
//       const messageData = { user, message: newMessage, timestamp: new Date() };
//       socket.emit("message", messageData);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className="message">
//             <strong>{msg.user}: </strong> {msg.message}{" "}
//             <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage} className="message-form">
//         <input
//           type="text"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//           placeholder="Your name"
//           required
//         />
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Your message"
//           required
//         />
//         <button type="submit">Send</button>
//       </form>
//       <style jsx>{`
//         .messages {
//           border: 1px solid #ccc;
//           padding: 10px;
//           margin-bottom: 10px;
//           height: 300px;
//           overflow-y: scroll;
//           margin-top: 120px;
//         }
//         .message {
//           padding: 5px 0;
//         }
//         .message-form {
//           display: flex;
//           flex-direction: column;
//         }
//         .message-form input {
//           margin-bottom: 5px;
//           padding: 8px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//         }
//         .message-form button {
//           padding: 10px;
//           border: none;
//           background-color: #007bff;
//           color: white;
//           border-radius: 4px;
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import styles from "./ChatBody.module.css";

const ChatBody = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Socket connected:", socket);

    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    fetch("http://localhost:5000/messages")
      .then((response) => response.json())
      .then((data) => {
        console.log("Messages fetched from API:", data);
        setMessages(data);
      });

    return () => socket.off("newMessage");
  }, [socket]);

  return (
    <div className={styles.chatBody}>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>
            {msg.sender && msg.sender.firstName}
            {msg.sender && msg.sender.lastName}:
          </strong>{" "}
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
