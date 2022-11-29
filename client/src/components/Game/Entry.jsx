import React, { useState } from "react";

//Temporary fix?

export default function Entry(props) {
  const [message, setMessage] = useState("");

  // const sendMessage = () => {
  //   socket.emit("send-message", "hello");
  // };
  const send = () => {
    console.log(message);
    props.sendMessage(message);
  };

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
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
