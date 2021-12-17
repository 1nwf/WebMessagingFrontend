import { useState, useEffect } from "react";
import axios from "axios";
import router, { useRouter } from "next/router";
import DM from "./msg";
import { socket, server } from "../socket";
import { Grid, makeStyles, Button, Box, Container } from "@material-ui/core";
import { Search } from "./search";
import { MessagePage } from "./MessagePage";
import { sizing } from "@material-ui/system";
import Chat from "../components/Chat";
import SideBar from "../components/sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  usersList: {
    margin: theme.spacing(2),
    width: "20px",
    height: "100px",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const user = props.user;

  const [cUsers, setCUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newDM, setNewDM] = useState("");
  const [msgUser, setMsgUser] = useState(null);

  const fetchUsers = () => {
    axios
      .get("https://chatapp-backend3.herokuapp.com/signUp")
      .then((res) => {
        const userData = res.data.filter(
          (person) => person.username != user.username
        );
        setAllUsers(userData);
        setFilteredUsers(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    socket.on("new-user", (newUsers) => {
      console.log(
        "NEW USER MAIN: " +
          JSON.stringify(newUsers.filter((el) => el.username != user.username))
      );
      fetchUsers();

      setCUsers(newUsers.filter((el) => el.username != user.username));

      console.log("CONNECTED USERS: " + JSON.stringify(newUsers));
    });
  }, []);

  const Logout = (e) => {
    localStorage.removeItem("user");
    router.push("/register");
  };

  useEffect(() => {
    fetchUsers();
  }, [cUsers]);

  useEffect(() => {
    socket.on("user_disconnected", (newUserList) => {
      setCUsers(newUserList.filter((el) => el.username != user.username));
      console.log("user dicon after: " + cUsers);
    });
  }, []);

  return (
    <div>
      <SideBar
        users={allUsers}
        selectedUser={setMsgUser}
        cUsers={cUsers}
        username={user.username}
      />

      <div style={{ marginLeft: "17%" }}>
        <h1>{user.username}</h1>
        <Button variant="outlined" size="small" onClick={(e) => Logout(e)}>
          Logout
        </Button>
        <p>{cUsers.length} online</p>
        <Chat selectedUser={msgUser} cUsers={cUsers} user={user} />
      </div>
    </div>
  );
}
