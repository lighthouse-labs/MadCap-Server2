import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

function SocketPoC() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("message", (message) => {
      console.log("here")
      setLastMessage(message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("send-message");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  const sendMessage = (s) => {
    socket.emit("send-message", message);
  };

  // const sendMessage = () => {
  //   socket.emit("send-message", "hello");
  // };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <p>last message:{lastMessage || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
      <div className="messages-input">
        <input
          type="text"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default SocketPoC;
