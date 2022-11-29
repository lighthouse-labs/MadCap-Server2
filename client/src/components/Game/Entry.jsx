import React, { useState } from "react";

import Box from "@mui/material/Box";

//Temporary fix?
export default function Entry(props) {
  const [message, setMessage] = useState("");

  // const sendMessage = () => {
  //   socket.emit("send-message", "hello");
  // };
  const send = () => {
    // console.log(message);
    props.sendMessage(message);
  };

  return (
    <Box className="entry-box" sx={{width: '100%'}}>
      {/* <p>Connected: {"" + props.isConnected}</p>
      <p>last message:{props.lastMessage || "-"}</p> */}
      <div className="messages-input" style={{display: 'flex',
    'flex-direction': 'row', 'justify-content': 'flex-end'}}>
        <input style={{width: '100%'}}
          type="text"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        />
        <button onClick={send}>Send</button>
      </div>
    </Box>
  );
}
