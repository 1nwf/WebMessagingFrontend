import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import DM from "../components/msg";

const UsersList = () => {
  const server = "https://chatapp-backend3.herokuapp.com/";
  const [users, setUsers] = useState([]);
  const [showDM, setShowDM] = useState(false);

  useEffect(() => {
    axios
      .get(server + "/signUp")
      .then((res) => {
        setUsers(res.data);
        console.log(users);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        users.map((user) => {
          return (
            <div key={user.username} style={{}}>
              <p key={user.username}>
                {user.username} {user.firstName}{" "}
                <a
                  href="#"
                  style={{ color: "blue" }}
                  onClick={(e) => setShowDM(!showDM)}
                >
                  dm
                </a>
              </p>
              {showDM ? <DM userID={user.username} /> : null}
              <img
                src={server + `/user_pfps/${user.pfp}`}
                style={{
                  objectFit: "cover",
                  height: 100,
                  width: 100,
                  borderRadius: 20,
                }}
              />
            </div>
          );
        })
      ) : (
        <p>No users</p>
      )}
    </div>
  );
};

export default UsersList;
