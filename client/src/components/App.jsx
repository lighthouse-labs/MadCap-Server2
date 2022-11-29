import { useState, useRef, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Welcome from "./Welcome";
import Lobby from "./Lobby";
import Game from "./Game"
import useVisualMode from "../hooks/useVisualMode";
import axios from 'axios';

import { generateRandomString } from '../helpers/helpers';

import './App.css';

export default function App(props) {

  const url = useRef(generateRandomString()).current;

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  // const GAME = "GAME";
  const { mode, transition } = useVisualMode(props.mode || WELCOME);

  const [name, setName] = useState("");

  let loader_url;

 loader_url = useLoaderData().url;

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleMakeGame = () => {
   transition(LOBBY)
  };

  useEffect(() => {

  }, [url])

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
          url={loader_url || url}
        />)}
      <Game />
    </div>
  );
}