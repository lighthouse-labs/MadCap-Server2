import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporay fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

function SocketPoC() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

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
      setLastMessage(message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  const sendMessage = (message) => {
    socket.emit("message", message);
  };


  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <p>last message:{lastMessage || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
      <button onClick={sendMessage("message")}>Send Message </button>
    </div>
  );
}

export default SocketPoC;
