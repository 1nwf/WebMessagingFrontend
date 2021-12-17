import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Button, TextField, Box } from "@material-ui/core";
import { sizing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(50),
  },
  bottom: {
    position: "fixed",
    bottom: 0,
    display: "inline-block",
    margin: theme.spacing(2),
    marginLeft: theme.spacing(50),
  },
  txtField: {
    width: "100%",
    alignContent: "center",
  },
  btn: {
    display: "inline-block",
    height: 60,
    width: "8%",
    marginLeft: 25,
    borderRadius: 10,
    backgroundColor: "lightblue",
    color: "black",
    border: "none",
  },
  marginAutoContainer: {
    width: 500,
    height: 60,
    display: "flex",
    backgroundColor: "gold",
  },
  marginAutoItem: {
    margin: "auto",
  },
  alignItemsAndJustifyContent: {
    width: "86%",
    height: 60,
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
}));

export const MessagePage = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const changeHandler = (e) => {
    setMsg(e.target.value);
    console.l;
  };
  return (
    <div>
      <h1 className={classes.root}>{msg}</h1>
      <ul className="messages"></ul>
      <Box borderRadius={10} width={1}>
        <form className={classes.bottom} style={{ width: "70%" }}>
          <input
            onChange={(e) => changeHandler(e)}
            className={classes.alignItemsAndJustifyContent}
            type="text"
            placeholder="Type a message ..."
          />

          <button className={classes.btn} onClick={(e) => submitHandler(e)}>
            Submit
          </button>
        </form>
      </Box>
    </div>
  );
};
