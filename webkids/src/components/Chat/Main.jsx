import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import ChatBody from "./ChatBody";
import Footer from "./Footer";
import main from "./main.module.css";

const Main = () => {
  const [socket] = useState(() => io("http://localhost:5000"));
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetch("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    }
  }, []);

  return (
    <div className={main.app}>
      <div className={main.contact}>
        <Navbar setSelectedUser={setSelectedUser} />
      </div>
      <div className={main.chat}>
        <ChatBody socket={socket} selectedUser={selectedUser} />
        <Footer socket={socket} token={token} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Main;

// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import Navbar from "./Navbar";
// import ChatBody from "./ChatBody";
// import Footer from "./Footer";
// import main from "./main.module.css";

// const Main = () => {
//   const [socket] = useState(() => io("http://localhost:5000"));
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       fetch("http://localhost:5000/user", {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//         .then((response) => response.json())
//         .then((data) => setUser(data));
//     }
//   }, []);

//   return (
//     <div className={main.app}>
//       <div className={main.contact}>
//         <Navbar setSelectedUser={setSelectedUser} />
//       </div>
//       <div className={main.chat}>
//         <ChatBody socket={socket} selectedUser={selectedUser} />
//         <Footer socket={socket} token={token} selectedUser={selectedUser} />
//       </div>
//     </div>
//   );
// };

// export default Main;
