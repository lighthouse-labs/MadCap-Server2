import Entry from "./Entry";
import AnswerList from "./AnswerList";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});
//
const defaultAlp = [
  {
    "letter": "a",
    "answer": "",
    "captureColour": ""
  },
  {
    "letter": "b",
    "answer": "",
    "captureColour": ""
  }
]
const defaultAlp2 = [
  {
    "letter": "c",
    "answer": "",
    "captureColour": ""
  },
  {
    "letter": "d",
    "answer": "",
    "captureColour": ""
  }
]

export default function Game(props) {
  const [state, setState] = useState({
    answers: defaultAlp,
    isConnected: socket.connected,
    lastMessage: null
  });


  const setAnswer = (message) => {
    const answers = state.answers.map((answer) => {
      if (answer.letter === message[0]) {
        return {
          letter: "o",
          answer: message,
          captureColour: "Red"
        };
      }
      return answer;
    });
    return answers
  }

  useEffect(() => {
    socket.on("connect", () => {
      setState({
        ...state,
        isConnected: true

      })
    });

    socket.on("disconnect", () => {
      setState({
        ...state,
        isConnected: false

      })
    });

    socket.on("message", (message) => {
      console.log(message[0])
      let answerset = setAnswer(message)
      console.log(state.answers)
      console.log(answerset)
      console.log([{letter: "a", answer: "arr", captureColour: "red"}, {letter: "c", answer: "", captureColour: ""}])
      console.log(answerset)
      // setState({
      //   ... state,
      //   answers:answerset
      // })
      

      setState(prev => ({
        ...prev,
        answers: answerset,
        lastMessage: message
      }));
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
      <AnswerList 
      answers = {state.answers}
      />
      <Entry
      sendMessage = {sendMessage}
      isConnected = {state.isConnected}
      lastMessage = {state.lastMessage}
       />
      
    </div>
  );
}

// [
//   {
//     "letter": "a",
//     "answer": "",
//     "captureColour": ""
//   },
//   {
//     "letter": "b",
//     "answer": "",
//     "captureColour": ""
//   }
// ]

// [
//   {
//     "letter": "a",
//     "answer": "arr",
//     "captureColour": "red"
//   },
//   {
//     "letter": "c",
//     "answer": "",
//     "captureColour": ""
//   }
// ]

// [
//   {
//     "letter": "a",
//     "answer": "ar",
//     "captureColour": "Red"
//   },
//   {
//     "letter": "b",
//     "answer": "",
//     "captureColour": ""
//   }
// ]
