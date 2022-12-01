import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import GameBoard from "./GameBoard";
import StatusBox from "./StatusBox";

import "./styles.css";

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});

// const dummyPlayers = [
//   { id: 8, color: 'blue', label: '8', imgPath: './avatars/avatar-temp-8.png', name: 'propplayer', url: "madcap.com/322klj4" },
//   { id: 7, color: 'green', label: '7', imgPath: './avatars/avatar-temp-7.png', name: 'doongle', url: "madcap.com/322klj4" },
//   { id: 6, color: 'yellow', label: '6', imgPath: './avatars/avatar-temp-6.png', name: 'finglebat', url: "madcap.com/322klj4" },
//   { id: 5, color: 'orange', label: '5', imgPath: './avatars/avatar-temp-5.png', name: 'pricklebash', url: "madcap.com/322klj4" },
//   { id: 4, color: 'red', label: '4', imgPath: './avatars/avatar-temp-4.png', name: 'dumbsqwad Jr.', url: "madcap.com/322klj4" }
// ];
const romanAlpha = [
  {
    id: 1,
    letter: "A",
    answer: "",
    captureColour: "",
    captureUser: "",
  },
  {
    id: 2,
    letter: "B",
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
    id: 4,
    letter: "D",
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
    id: 6,
    letter: "F",
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
    id: 8,
    letter: "H",
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
    id: 10,
    letter: "J",
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
    id: 12,
    letter: "L",
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
    id: 14,
    letter: "N",
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
    id: 16,
    letter: "P",
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
    id: 18,
    letter: "R",
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
    id: 20,
    letter: "T",
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
    id: 22,
    letter: "V",
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
    id: 24,
    letter: "X",
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
    id: 26,
    letter: "Z",
    answer: "",
    captureColour: "",
  },
];
const dummychat = [
  // {
  //   type: "chat",
  //   user: "dummychatuser",
  //   message: "dummychatmessage",
  // },
  // {
  //   type: "capture",
  //   user: "dummychatuser",
  //   message: "A",
  // },
];
// const dummyuser = {
//   name: "Dummy",
//   url: "madcap.com/322klj4",
//   colour: "Green",
//   avatar: 1,
//   score: 10,
//   admin: true
// };

export default function Game(props) {

  // extract all logic eventually...

  const [state, setState] = useState({
    answers: romanAlpha,
    chats: dummychat,
    isConnected: socket.connected,
    lastMessage: null,
    //phase : game, results & podium
    phase: "game",
    players: props.gameData.users,
    //needs to be set to player
    player: props.gameData && props.gameData.users[0]
  });
  
  // fn setphase to results
  // in timer pass down props.phase result
  const setStatePhase = (phase) => {
    setState(prev => (
      { ...prev, phase: phase }
    ));
  };

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
  // however it does work..
  const confirmUsed = (message, gameState) => {
    for (const answer of gameState.answers) {
      if (answer.letter === message.message[0] && answer.answer) {
        return true;
      }
    }
    return false;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const setPlayerScore = (name, gameState, change) => {
    const players = gameState.players.map((player) => {
      if (player.name === name) {
        let newScore = player.score + change;
        return {
          ...player,
          score: newScore
        };
      }
      return player;
    });
    return players;
  };

  const stateRef = useRef(state);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    stateRef.current = state;
  });

  useEffect(() => {
    // console.log(stateRef.current);

    socket.on("connect", () => {
      // console.log("connected");
      socket.emit("set-room", stateRef.current.player.url);
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
      console.log(stateRef.current);
      if (
        message.type === "capture" &&
        !confirmUsed(message, stateRef.current)
      ) {
        let playerSet = setPlayerScore(message.user, stateRef.current, 10);
        console.log(playerSet);

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
          players: playerSet
        }));
      }
      if (message.type === "chat") {
        let chatSet = [
          ...stateRef.current.chats,
          { type: "chat", user: message.user, message: message.message },
        ];
        setState((prev) => ({
          ...prev,
          chats: chatSet,
          lastMessage: message.message,
        }));
      }
      // console.log(stateRef.current)
    });

    //can be used to update from host

    socket.on("request-state", (message) => {
      console.log("state requested");
      if (stateRef.current.player.admin) {
        console.log("got here");
        let currentState = {
          answers: stateRef.current.answers,
          chats: stateRef.current.chats,
          room: stateRef.current.player.url
        };
        console.log(currentState);
        socket.emit("send-state", currentState);
      }
    });

    socket.on("sync-state", (message) => {
      console.log("state syncing");
      setState((prev) => ({
        ...prev,
        message: message.answers,
        chats: message.chats,
      }));

    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("request-state");
      socket.off("sync-state");
    };
  }, []);

  const sendMessage = (message) => {
    //had to move this here, since can connect when not on this page
    //less backend setting if just have a state "inroom"

    //needs url set to user
    socket.emit("set-room", "dummyroom");
    let messagetype = "chat";
    if (stateRef.current.phase === "game") {
      messagetype = "capture";
    }
    let messageUpper = capitalizeFirstLetter(message);
    const messageObject = {
      message: messageUpper,
      room: "dummyroom",
      colour: state.player.color,
      user: state.player.name,
      type: messagetype,
    };
    // console.log(messageObject);
    // console.log(socket);
    socket.emit("send-message", messageObject);
  };

  return (
    <div className="game-main">
      <Box
        className="game-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 435,
          height: "100%",
          width: "100%",
          px: 0,
          backgroundColor: "#f0f2ff",
        }}
      >
        <GameBoard
          answers={state.answers}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          phase={state.phase}
          setStatePhase={setStatePhase}
        // gameTimer={gameTimer}
        // voteTimer={voteTimer}
        />
        <StatusBox
          sendMessage={sendMessage}
          isConnected={state.isConnected}
          lastMessage={state.lastMessage}
          chats={state.chats}
          players={state.players}
        />
      </Box>
    </div>
  );
}
