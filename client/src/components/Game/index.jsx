import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import Container from "@mui/material/Container";
// import Box from "@mui/material/Box"

import GameBoard from "./GameBoard";
import StatusBox from "./StatusBox";

import "./styles.css";

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
//
const romanAlpha = [
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
const dummychat = [
  {
    type: "chat",
    user: "dummychatuser",
    message: "dummychatmessage",
  },
  {
    type: "capture",
    user: "dummychatuser",
    message: "A",
  },
];
const dummyuser = {
  name: "Dummy",
  url: "madcap.com/322klj4",
  colour: "Green",
  avatar: 1,
  score: 10,
};

export default function Game(props) {
  const [state, setState] = useState({
    answers: romanAlpha,
    chats: dummychat,
    isConnected: socket.connected,
    lastMessage: null,
  });

  const setAnswer = (message, store) => {
    //sets the details of the letter in game
    const answers = store.answers.map((answer) => {
      if (answer.letter === message.message[0]) {
        return {
          ...answer,
          answer: message.message,
          captureColour: message.colour,
        };
      }
      return answer;
    });
    return answers;
  };
  //this was done in a really dumb way, but works. should probably fix
  const confirmUsed = (message, gameState) => {
    for (const answer of gameState.answers) {
      if (answer.letter === message.message[0] && answer.answer) {
        return true;
      }
    }
    return false;
  };

  const stateRef = useRef(state);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    stateRef.current = state;
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("set-room", dummyuser.url);
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
      if (
        message.type === "capture" &&
        !confirmUsed(message, stateRef.current)
      ) {
        let answerSet = setAnswer(message, stateRef.current);
        let chatSet = [
          ...stateRef.current.chats,
          { type: "capture", user: message.user, message: message.message[0] },
        ];
        setState((prev) => ({
          ...prev,
          answers: answerSet,
          chats: chatSet,
          lastMessage: message.message,
        }));
      }

      // console.log(stateRef.current)
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const sendMessage = (message) => {
    const messageObject = {
      message: message,
      room: dummyuser.url,
      colour: dummyuser.colour,
      user: dummyuser.name,
      type: "capture",
    };
    socket.emit("send-message", messageObject);
  };

  return (
    <div className="game-main">

      <Container className="game-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 435,
          height: '100%',
          width: '100%',
          px: 0,
          // '& .MuiContainer-root': {@media (min-width: 600px) {px: 0}}
          
        }}>
        <GameBoard answers={state.answers}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage} />
        <StatusBox sendMessage={sendMessage}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          chats={state.chats} />
      </Container>
    </div>
  );
}