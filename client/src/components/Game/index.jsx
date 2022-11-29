import Entry from "./Entry";
import AnswerList from "./AnswerList";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
let letters =  [{letter: "a", answer: "", captureColour: ""}, {letter: "b", answer: "", captureColour: ""}]

export default function Game(props) {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("message", (message) => {
      console.log("here")
      setLastMessage(message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("send-message");
    };
  }, []);



  const sendMessage = (s) => {
    socket.emit("send-message", message);
  };

  return (
    <div className="welcome-main">
      <AnswerList 
      answers = {letters}
      />
      <Entry
      sendMessage = {sendMessage}

       />
      
    </div>
  );
}
