import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import Container from "@mui/material/Container";

import Entry from "./Entry";
import GameBoard from "./GameBoard";

import "./styles.css";

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
//
const romanAlph = [
  {
    id: 1,
    letter: "A",
    answer: "",
    captureColour: "",
  },
  {
    id: 14,
    letter: "N",
    answer: "",
    captureColour: "",
  },
  {
    id: 2,
    letter: "B",
    answer: "",
    captureColour: "",
  },
  {
    id: 15,
    letter: "O",
    answer: "",
    captureColour: "",
  },
  {
    id: 3,
    letter: "C",
    answer: "",
    captureColour: "",
  },
  {
    id: 16,
    letter: "P",
    answer: "",
    captureColour: "",
  },
  {
    id: 4,
    letter: "D",
    answer: "",
    captureColour: "",
  },
  {
    id: 17,
    letter: "Q",
    answer: "",
    captureColour: "",
  },
  {
    id: 5,
    letter: "E",
    answer: "",
    captureColour: "",
  },
  {
    id: 18,
    letter: "R",
    answer: "",
    captureColour: "",
  },
  {
    id: 6,
    letter: "F",
    answer: "",
    captureColour: "",
  },
  {
    id: 19,
    letter: "S",
    answer: "",
    captureColour: "",
  },
  {
    id: 7,
    letter: "G",
    answer: "",
    captureColour: "",
  },
  {
    id: 20,
    letter: "T",
    answer: "",
    captureColour: "",
  },
  {
    id: 8,
    letter: "H",
    answer: "",
    captureColour: "",
  },
  {
    id: 21,
    letter: "U",
    answer: "",
    captureColour: "",
  },
  {
    id: 9,
    letter: "I",
    answer: "",
    captureColour: "",
  },
  {
    id: 22,
    letter: "V",
    answer: "",
    captureColour: "",
  },
  {
    id: 10,
    letter: "J",
    answer: "",
    captureColour: "",
  },
  {
    id: 23,
    letter: "W",
    answer: "",
    captureColour: "",
  },
  {
    id: 11,
    letter: "K",
    answer: "",
    captureColour: "",
  },
  {
    id: 24,
    letter: "X",
    answer: "",
    captureColour: "",
  },
  {
    id: 12,
    letter: "L",
    answer: "",
    captureColour: "",
  },
  {
    id: 25,
    letter: "Y",
    answer: "",
    captureColour: "",
  },
  {
    id: 13,
    letter: "M",
    answer: "",
    captureColour: "",
  },
  {
    id: 26,
    letter: "Z",
    answer: "",
    captureColour: "",
  },
  
];

export default function Game(props) {
  const [state, setState] = useState({
    answers: romanAlph,
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
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: 435,
          height: 'fit-content',
          width: '100%'
        }}>
        <GameBoard answers={state.answers}/>
        <Entry
          sendMessage={sendMessage}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
        />
      </Container>
    </div>
  );
}
