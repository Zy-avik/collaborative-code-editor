import React, { useEffect, useState} from "react";
import socket from "../socket";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (userList) => {
        setUsers(userList);
    });

      return () => {
        socket.off("users");
      };
    }, []);
    
    return (
        <div style={{ padding: "10px", border: "1px solid #ccc",height: "100vh" }}>
            <h3> Online Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.id}</li>
                ))}
            </ul>
        </div>
    );
}