import { useState, useRef, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import axios from 'axios';

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
  const [cookies, setCookie] = useCookies(['host']);

  const url = useRef(generateRandomString()).current;

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  const GAME = "GAME";

  // useEffect(() => {
  //   axios.get(`api/games/${url_path}`)
  //   .then((response) => {
  //     setGameData((prev) => {
  //       console.log(prev);
  //       return response.data
  //     }, []);
  //   })
  //   .catch((error) => console.error(error.message))

  // })

  useEffect(() => {
    transition(cookies.host ? props.mode : WELCOME);
  }, [cookies.host, props.mode]);

  console.log("loader_url:", full_url);
  console.log("url_path:", url_path);


  const { mode, transition } = useVisualMode(WELCOME);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const setHost = () => {
    setCookie('host', true, { path: '/' });
  }

  function handleStart() {
    transition(GAME);
  }


  // const handleMakeGame = () => {
  //  transition(LOBBY)
  // };



  return (
    <div className="App">
      {/* Welcome is default */}
      {mode === WELCOME && (
        <Welcome
          transition={transition}
          url_path={url_path}
          url={url}
          name={name}
          host={cookies.host}
          // avatar={avatar}
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
          gameData={gameData}
          setGameData={setGameData}
        />)}

      {mode === "GAME" && <Game
        gameData={gameData}
      />}

    </div>


  );
}