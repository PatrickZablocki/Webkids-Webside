import React, { useEffect, useState } from "react";

const Navbar = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <nav>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <p key={user._id} onClick={() => setSelectedUser(user)}>
            {user.firstName} {user.lastName}
          </p>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
