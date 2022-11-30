import { useState, useRef } from 'react';
// import Welcome from "./Welcome";
// import Lobby from "./Lobby";
import Game from "./Game";
// import useVisualMode from "../hooks/useVisualMode";
import axios from 'axios';

import { generateRandomString } from '../helpers/helpers';

import './App.css';

export default function App() {

  const url = useRef(generateRandomString()).current;

  // const WELCOME = "WELCOME";
  // const LOBBY = "LOBBY";
  // const GAME = "GAME";
                                //change to WELCOME
  // const { mode, transition } = useVisualMode(GAME);
  // const [name, setName] = useState("");

  // const [color, setColor] = useState(null)
  // const [avatar, setAvatar] = useState(null);
  // const [name, setName] = useState("");

  // const handleName = (e) => {
  //   setName(e.target.value);
  // };

  // function handleJoin(id, name, color) {
  //   axios.post(`/api/games/1/users`, {
  //     name: 'shelly',
  //     color: 'purple'
  //   })
  //     .then(() => transition(LOBBY))
  //     .catch(err => console.log(err));
  // }

  // function handleStart() {
  //   transition(GAME);
  // }

  // const handleMakeGame = () => {
  //  transition(LOBBY)
  // };

  return (
    <div className="App">
      {/* Welcome is default */}
      {/* {mode === WELCOME && (
        <Welcome
          url={url}
          name={name}
          // avatar={avatar}
          handleName={handleName}
          onClick={handleMakeGame}
        />
      )} */}
      {/* {mode === LOBBY && (
        <Lobby
          name={name}
          url={url}
        />)} */}
      <Game />
    </div>
  );
}