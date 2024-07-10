import React, { useState } from "react";

const Footer = ({ socket, token }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log("Sending message:", message);
      socket.emit("sendMessage", { token, content: message });
      setMessage("");
    }
  };

  return (
    <footer>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </footer>
  );
};

export default Footer;
