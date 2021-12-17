import { useState, useEffect, useRef } from "react";
import axios from "axios";
import router, { useRouter } from "next/router";

import Main from "../components/main";

import { socket } from "../socket";
import UsersList from "../components/UsersList";
import DM from "../components/msg";

import { io } from "socket.io-client";

const server = "https://chatapp-backend3.herokuapp.com/";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      const id = socket.id;
      const username = socket.auth.username;
      console.log("SOCKET USERNAME: " + username);
      const userInfo = { id: id, username: username };
      socket.emit("new-connection", userInfo);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      const { username } = JSON.parse(loggedInUser);
      socket.auth = { username: username };
      socket.connect();
    } else {
      router.push("/register");
    }
  }, []);

  return <div>{user != null ? <Main user={user} /> : <h1>Error</h1>}</div>;
}
