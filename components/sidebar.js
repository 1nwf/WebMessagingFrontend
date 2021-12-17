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
import { server } from "../socket";
export default function SideBar(props) {
  const users = props.users;
  const setUser = props.selectedUser;
  const cUsers = props.cUsers;
  const username = props.username;

  const selectUser = (person) => {
    setUser(person);
  };

  return (
    <div className={styles.UsersList}>
      {users != null ? (
        users.map((user) => {
          return (
            <div
              key={user.username}
              onClick={(e) => selectUser(user)}
              className={styles.users}
            >
              <img
                className={styles.img}
                src={server + "user_pfps/" + user.pfp}
                height={50}
                width={50}
              />
              <h4 style={{ color: "black", paddingLeft: "30%" }}>
                {user.username}
              </h4>
              <p
                style={
                  user.status == "online"
                    ? { color: "green", fontWeight: "bold", textAlign: "left" }
                    : { color: "red", textAlign: "left" }
                }
              >
                {user.status}
              </p>

              <hr className={styles.hr} />
            </div>
          );
        })
      ) : (
        <p style={{ color: "white" }}> No Users Online</p>
      )}
    </div>
  );
}
