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
