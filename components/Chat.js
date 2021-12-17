import React, { useState, useEffect, useRef } from "react";
import styles from "./layout.module.css";
import { server, socket } from "../socket";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

export default function Lay(props) {
  const messages = useRef([]);
  const [dm, setDM] = useState("");
  const [msgList, setMsgList] = useState([]);
  const user = props.user;
  const selectedUser = props.selectedUser;
  const cUsers = props.cUsers;
  const [mm, setMM] = useState([]);
  const [incMsg, setIncMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const [previousMsgs, setPreviousMsgs] = useState([]);
  const [userSelected, setUserSelected] = useState(false);
  const [unreadMsgs, setUnreadMsgs] = useState([]);

  const changeHandler = (e) => {
    setDM(e.target.value);
  };

  useEffect(() => {
    if (selectedUser != undefined && user != undefined) {
      console.log("username: " + user.password);
      setUserSelected(true);
      setLoading(true);
      const url = "https://chatapp-backend3.herokuapp.com/msg/";

      const userData = {
        username: user.username,
        password: user.password,
        chatUser: selectedUser.username,
      };
      axios
        .post(url, userData)
        .then((res) => {
          console.log("user messages: " + JSON.stringify(res.data.messages));

          if (res.data.messages != undefined) {
            console.log("user messages: " + JSON.stringify(res.data.messages));
            setPreviousMsgs(res.data.messages);
          } else {
            setPreviousMsgs([]);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [selectedUser, user]);

  const url = "https://chatapp-backend3.herokuapp.com/msg/sendMessage";

  const updateMsgList = (newItem) => {
    messages.current = [...msgList, newItem];
    setMsgList(messages.current);
  };

  const sendMessage = (msg, [user_1, user_2], from) => {
    const data = { msg: msg, user_1: user_1, user_2: user_2, from: from };
    console.log("data: " + JSON.stringify(data));
    axios
      .post(url, data)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const person = cUsers.filter(
      (el) => el.username == selectedUser.username
    )[0];
    var data = { dm: dm, fromUser: true };
    updateMsgList(data);
    console.log("LIST FROM SUBMIT: " + JSON.stringify(msgList));

    if (person) {
      socket.emit("dm", {
        dm,
        to: person.id,
      });
    }
    sendMessage(dm, [user.username, selectedUser.username], user.username);
    setDM("");
  };

  useEffect(() => {
    var usernameOfSelectedUser =
      selectedUser != null ? selectedUser.username : "";
    socket.on("new-dm", (newMSG) => {
      console.log("MSG FROM: " + newMSG.from);
      console.log("username selectore: " + usernameOfSelectedUser);
      if (newMSG.from != usernameOfSelectedUser) {
        console.log("new unread message");
      }

      var newData = { ...newMSG, fromUser: false };

      setIncMsg(newData);
    });
  }, [selectedUser]);

  useEffect(() => {
    updateMsgList(incMsg);
  }, [incMsg]);

  return (
    <div>
      {loading == true ? (
        <CircularProgress size={70} className={styles.loadingProgress} />
      ) : selectedUser != null ? (
        <div className={styles.MSGContainer}>
          <p>chatting with {selectedUser.username}</p>
          <ul className={styles.msg}>
            {previousMsgs.length > 0
              ? previousMsgs.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        el.from == user.username ? styles.u1 : styles.u2
                      }
                    >
                      {el.message}
                    </li>
                  );
                })
              : null}
            {msgList.map((el, index) => {
              return (
                <li key={index} className={el.fromUser ? styles.u1 : styles.u2}>
                  {el.dm}
                </li>
              );
            })}
          </ul>

          {userSelected ? (
            <form className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type a message..."
                value={dm}
                onChange={(e) => changeHandler(e)}
              ></input>
              <button
                className={styles.btn}
                type="submit"
                onClick={(e) => submitHandler(e)}
              >
                Send
              </button>
            </form>
          ) : null}
        </div>
      ) : (
        <p>Choose a user to chat with</p>
      )}
    </div>
  );
}
