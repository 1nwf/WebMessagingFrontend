import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Button,
  TextField,
  Box,
  Container,
} from "@material-ui/core";
import { sizing, spacing } from "@material-ui/system";
import { MessagePage } from "./MessagePage";
import styles from "./layout.module.css";
import SideBar from "./sidebar";
import Chat from "./Chat";
export default function Lay() {
  const [list1, setEx] = useState([]);

  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    var l1 = [];
    for (let i = 1; i < 10; i++) {
      l1.push("nwf");
    }
    setEx(l1);
  }, []);

  useEffect(() => {
    console.log(list1);
  }, [list1]);

  const changeHandler = (e) => {
    setMsg(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    msgList.push(msg);
    setMsgList(msgList);
  };
  return (
    <div>
      <SideBar />
      <div className={styles.main}>
        <h3>username</h3>
        <hr />
        <Chat />
      </div>
    </div>
  );
}
