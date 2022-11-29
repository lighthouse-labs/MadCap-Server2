import { useState, useRef } from 'react';
import Welcome from "./Welcome";
import Lobby from "./Lobby";
import Game from "./Game"
import useVisualMode from "../hooks/useVisualMode";
import axios from 'axios';

import { generateRandomString } from '../helpers/helpers';

import './App.css';

export default function App() {

  const url = useRef(generateRandomString()).current;

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  // const GAME = "GAME";
  const { mode, transition } = useVisualMode(WELCOME);

  const [color, setColor] = useState(null)
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleMakeGame = () => {
   transition(LOBBY)
  };

  return (
    <div className="App">
      {/* Welcome is default */}
      {mode === WELCOME && (
        <Welcome
          url={url}
          name={name}
          handleName={handleName}
          onClick={handleMakeGame}
        />
      )}
      {mode === LOBBY && (
        <Lobby
          name={name}
          url={url}
        />)}
      <Game />
    </div>
  );
}