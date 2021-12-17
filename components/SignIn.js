import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import styles from "../pages/register/register.module.css";

function SignInForm() {
  const router = useRouter();
  const url = "https://chatapp-backend3.herokuapp.com/signIn";
  const [data, setdata] = useState({
    username: "",
    password: "",
  });
  function handle(e) {
    const id = e.target.id.split(" ")[1];
    const newData = { ...data };
    newData[id] = e.target.value;
    setdata(newData);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/");
      })
      .catch((e) => console.log(e.message));
  }
  return (
    <div>
      <h1>Sign in</h1>
      <form>
        <TextField
          onChange={(e) => handle(e)}
          value={data.username}
          id="outlined-basic username"
          label="Username"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          onChange={(e) => handle(e)}
          value={data.password}
          id="outlined-basic password"
          label="Password"
          variant="outlined"
          type="password"
          className={styles.input}
        />
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          onClick={(e) => submit(e)}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
export default SignInForm;
