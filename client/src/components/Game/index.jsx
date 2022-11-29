import Entry from "./Entry";
import AnswerList from "./AnswerList";

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
//
const defaultAlp = [
  {
    letter: "a",
    answer: "",
    captureColour: "",
    id:1
  },
  {
    letter: "b",
    id: 2
  },
  {
    letter: "c",
    id:3
  },
  {
    letter: "d",
    id:4
  },
  {
    letter: "z",
    id:25
  },
];

export default function Game(props) {
  const [state, setState] = useState({
    answers: defaultAlp,
    isConnected: socket.connected,
    lastMessage: null,
  });

  const setAnswer = (message, stort) => {
    //sets the details of the letter in game
    const answers = stort.answers.map((answer) => {
      if (answer.letter === message[0]) {
        return {
          letter: answer.letter,
          answer: message,
          captureColour: "Red",
        };
      }
      return answer;
    });
    return answers;
  };

  const stateRef = useRef(state);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    stateRef.current = state;
  });

  useEffect(() => {
    socket.on("connect", () => {
      setState({
        ...stateRef.current,
        isConnected: true,
      });
    });

    socket.on("disconnect", () => {
      setState({
        ...stateRef.current,
        isConnected: false,
      });
    });

    socket.on("message", (message) => {
      let answerset = setAnswer(message, stateRef.current);

      setState((prev) => ({
        ...prev,
        answers: answerset,
        lastMessage: message,
      }));

      // console.log(stateRef.current)
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("send-message", message);
  };

  return (
    <div className="welcome-main">
      <AnswerList answers={state.answers} />
      <Entry
        sendMessage={sendMessage}
        isConnected={state.isConnected}
        lastMessage={state.lastMessage}
      />
    </div>
  );
}
