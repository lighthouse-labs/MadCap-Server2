import React, { useState } from "react";

import Box from "@mui/material/Box";

//Temporary fix?
export default function Entry(props) {
  const [message, setMessage] = useState("");

  // const sendMessage = () => {
  //   socket.emit("send-message", "hello");
  // };

  const send = () => {
    props.sendMessage(message);
    console.log('submit state', message);
  };

  const post = (e) => {
    setMessage(e.target.value);
    console.log('state change', message)
  };

  /// if event.target ==

  return (
    <Box className="entry-box" sx={{ width: '100%' }}>
      {/* <p>Connected: {"" + props.isConnected}</p>
      <p>last message:{props.lastMessage || "-"}</p> */}
      <div className="messages-input"
        style={{
          display: 'flex',
          flexDirection: 'row', justifyContent: 'flex-end'
        }}>
        <input id="message-box"
          style={{ width: '100%' }}
          type="text"
          onChange={post}
          value={message}
        />
        <button id="submit" onClick={send}>Send</button>
      </div>
    </Box>
  );
}