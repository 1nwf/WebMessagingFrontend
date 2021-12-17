import { useState, useEffect } from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
export const Search = (props) => {
  const classes = useStyles();
  const users = props.users;
  const filteredSet = props.filteredSet;
  const setUsers = props.changeUsers;
  const [searchInput, setSearchInput] = useState("");
  const noUsers = "No Users Available";
  const [showNoUsers, setShowNoUsers] = useState(false);
  const changeHandler = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value != "") {
      setUsers(
        users.filter((user) => user.username.startsWith(e.target.value))
      );
    } else {
      setUsers(users);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
    setUsers(users.filter((user) => user.username == searchInput));
  };
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Search Users"
          value={searchInput}
          onChange={(e) => changeHandler(e)}
        />
      </form>
    </>
  );
};
