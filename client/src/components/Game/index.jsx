import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import Container from "@mui/material/Container";

import Entry from "./Entry";
import AnswerList from "./AnswerList";

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
//
const defaultAlph = [
  {
    letter: "a",
    answer: "",
    captureColour: "",
  },
  {
    letter: "b",
    answer: "",
    captureColour: "",
  },
  { 
    letter: "c",
    answer: "",
    captureColour: "",
  },
  {
    letter: "d",
    answer: "",
    captureColour: "",
  },
  { 
    letter: "e",
    answer: "",
    captureColour: "",
  },
  {
    letter: "f",
    answer: "",
    captureColour: "",
  },
  { 
    letter: "a",
    answer: "",
    captureColour: "",
  },
  {
    letter: "b",
    answer: "",
    captureColour: "",
  },
  { 
    letter: "c",
    answer: "",
    captureColour: "",
  },
  {
    letter: "d",
    answer: "",
    captureColour: "",
  },
  { 
    letter: "e",
    answer: "",
    captureColour: "",
  }
];

export default function Game(props) {
  const [state, setState] = useState({
    answers: defaultAlph,
    isConnected: socket.connected,
    lastMessage: null,
  });

  const setAnswer = (message, store) => {
    //sets the details of the letter in game
    const answers = store.answers.map((answer) => {
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
    <div className="game-main">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 435,
          height: 'fit-content',
          width: '100%'
        }}>
        <AnswerList answers={state.answers} />
        <Entry
          sendMessage={sendMessage}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
        />
      </Container>
    </div>
  );
}
