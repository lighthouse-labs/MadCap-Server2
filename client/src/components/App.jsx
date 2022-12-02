import { useState, useRef, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import axios from 'axios';
import Welcome from "./Welcome";
import Lobby from "./Lobby";
import Game from "./Game";

import useVisualMode from "../hooks/useVisualMode";
import { generateRandomString } from '../helpers/helpers';


import './App.css';


export default function App(props) {

  const { full_url, url_path } = useLoaderData();

  const [gameData, setGameData] = useState([]);
  const [name, setName] = useState("");
  const [hostCookies, setHostCookie] = useCookies(['host']);

  const url = useRef(generateRandomString()).current;

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  const GAME = "GAME";

  const { mode, transition } = useVisualMode(WELCOME);

  useEffect(() => {
    transition(hostCookies.host ? props.mode : WELCOME);
  }, [hostCookies.host, props.mode]);

  const [currentUserCookies, setCurrentUserCookie] = useCookies(['user']);

  console.log("loader_url:", full_url);
  console.log("url_path:", url_path);



  const handleName = (e) => {
    setName(e.target.value);
  };

  const setHost = () => {
    setHostCookie('host', true, { path: '/' });
  }

  const setCurrentUser = (id) => {
    setCurrentUserCookie('user', id, { path: '/' })
  }

  function handleStart() {
    transition(GAME);
  }

  // const handleMakeGame = () => {
  //  transition(LOBBY)
  // };

  return (
    <div className="App">
      
      {mode === WELCOME && (
        <Welcome
          transition={transition}
          url_path={url_path}
          url={url}
          name={name}
          host={hostCookies.host}
          // avatar={avatar}
          setCurrentUser={setCurrentUser}
          handleName={handleName}
          setHost={setHost}
        />
      )}
      
      {mode === LOBBY && (
        <Lobby
          name={name}
          url={full_url}
          url_path={url_path}
          handleStart={handleStart}
          currentUser={Number(currentUserCookies.user)}
          gameData={gameData}
          setGameData={setGameData}
        />)}

      {mode === "GAME" && <Game
        gameData={gameData} currentUser={Number(currentUserCookies.user)}
      />}

    </div>
  );
}