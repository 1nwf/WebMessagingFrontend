import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SignInForm from "../../components/SignIn";
import { Button, TextField } from "@material-ui/core";
import styles from "./register.module.css";

function SignUpForm() {
  const router = useRouter();
  const url = "https://chatapp-backend3.herokuapp.com/signUp";
  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [pfp, setPfp] = useState("");
  const [signInShown, setSignIn] = useState(false);
  const showSignIn = () => setSignIn(!signInShown);

  function handle(e) {
    const newData = { ...data };

    const id = e.target.id.split(" ")[1];
    newData[id] = e.target.value;

    setData(newData);
  }

  function submit(e) {
    const formData = new FormData();
    formData.append("pfp", pfp);
    formData.append("username", data.username);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    e.preventDefault();

    console.log("new data: " + data);

    axios
      .post(url, formData)

      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/");
      })
      .catch((e) => console.log(e.response));
  }
  return (
    <div className={styles.main}>
      {signInShown ? (
        <SignInForm />
      ) : (
        <>
          <h1>Register</h1>
          <form className={styles.form} encType="multipart/form-data">
            <TextField
              id="outlined-basic firstName"
              onChange={(e) => handle(e)}
              value={data.firstName}
              label="First Name"
              variant="outlined"
              className={styles.input}
            />
            <TextField
              id="outlined-basic lastName"
              onChange={(e) => handle(e)}
              value={data.lastName}
              label="Last Name"
              variant="outlined"
              className={styles.input}
            />
            <TextField
              id="outlined-basic username"
              onChange={(e) => handle(e)}
              value={data.username}
              label="Username"
              variant="outlined"
              className={styles.input}
            />
            <TextField
              id="outlined-basic email"
              onChange={(e) => handle(e)}
              value={data.email}
              label="Email"
              variant="outlined"
              className={styles.input}
            />
            <TextField
              id="outlined-basic password"
              onChange={(e) => handle(e)}
              value={data.password}
              label="Password"
              variant="outlined"
              type="password"
              className={styles.input}
            />
            <br /> <br />
            <div className={styles.buttons}>
              <Button
                className={styles.input}
                variant="contained"
                color="secondary"
                component="label"
                disableElevation
              >
                Upload PFP
                <input
                  type="file"
                  name="pfp"
                  id="pfp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPfp(file);
                  }}
                />
              </Button>
              <br />
              <br />

              <Button
                onClick={(e) => submit(e)}
                className={styles.input}
                variant="contained"
                color="primary"
                disableElevation
              >
                Sign Up
              </Button>
              <br />
              <br />
            </div>
          </form>
        </>
      )}
      <p>or</p>
      <Button variant="outlined" onClick={showSignIn}>
        {signInShown ? "Sign Up" : "Sign in"}
      </Button>
      <br />
      <br />
    </div>
  );
}

export default SignUpForm;
