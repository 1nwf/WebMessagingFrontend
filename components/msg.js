import React, { useState, useEffect } from "react";
import { socket } from "../socket";

function DM(props) {
  const userId = props.userId;
  const username = props.username;
  const [dm, setDM] = useState("");
  const [showDM, setShowDM] = useState(false);

  const [newDM, setNewDM] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("dm", {
      dm,
      to: userId,
    });
  };
  const changeHandler = (e) => {
    setDM(e.target.value);
  };

  useEffect(() => {
    socket.on("new-dm", (newMSG) => {
      if (userId === newMSG.from) {
        console.log(newMSG);
        setNewDM(newMSG.dm);
      }
    });
  }, []);
  return (
    <div>
      <p>{newDM}</p>
      <button onClick={(e) => setShowDM(!showDM)}>DM</button>
      {showDM ? (
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            onChange={(e) => changeHandler(e)}
            id="msg"
            value={dm}
            type="text"
            placeholder="Message"
          />
          <button type="submit">Send</button>
        </form>
      ) : null}
    </div>
  );
}
export default DM;
