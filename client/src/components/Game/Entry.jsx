import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

export default function Entry(props) {
  const [message, setMessage] = useState("");

  // const sendMessage = () => {
  //   socket.emit("send-message", "hello");
  // };

  return (
    <div>
      <p>Connected: {"" + props.isConnected}</p>
      <p>last message:{props.lastMessage || "-"}</p>
      <div className="messages-input">
        <input
          type="text"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        />
        <button onClick={props.sendMessage}>Send</button>
      </div>
    </div>
  );
}
