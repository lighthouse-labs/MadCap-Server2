import { useState, useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import io from "socket.io-client"
// import axios from 'axios';
import Welcome from "./Welcome";
import Lobby from "./Lobby";
import Game from "./Game";


import useVisualMode from "../hooks/useVisualMode";


import './App.css';

const SERVER = "http://127.0.0.1:8001";
//Temporary fix?
const socket = io(SERVER, {
  transports: ["websocket"],
});


export default function App(props) {

  const { full_url, url_path } = useLoaderData();

  const [gameData, setGameData] = useState([]);
  const [name, setName] = useState("");
  const [hostCookies, setHostCookie, removeHostCookie] = useCookies(['host']);
  const [currentUserCookies, setCurrentUserCookie, removeCurrentUserCookie] = useCookies(['user']);
 

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  const GAME = "GAME";

  const { mode, transition } = useVisualMode(WELCOME);

  useEffect(() => {
    if(!url_path || url_path === '/') {
      removeCurrentUserCookie('user', { path: '/'});
      removeHostCookie('host', { path: '/'})
    }
  }, [url_path])

  useEffect(() => {
    transition(hostCookies.host ? LOBBY : WELCOME);
  }, [hostCookies.host, props.mode]);


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
    socket.emit("host-start-game", url_path)
    transition(GAME);
  }

  // const handleMakeGame = () => {
  //  transition(LOBBY)
  // };

  const modeRef = useRef(mode);
  useEffect(() => {
    //without this, state ref in sockets will be out of date (when they are connected)
    modeRef.current = mode;
  });

  useEffect(() => {
    // console.log(stateRef.current);

    socket.on("start-game",  () => {
      console.log("host start game");
      console.log(modeRef.current)
      if (modeRef.current === LOBBY){
        transition(GAME);
      }
    });

    return () => {
    socket.off("start-game");

    };
  }, []);
  const checkedIn = () => {
    socket.emit("set-room", url_path); 
  }


  return (
    <div className="App">
      
      {mode === WELCOME && (
        <Welcome
          transition={transition}
          url_path={url_path}
          name={name}
          host={hostCookies.host}
          // avatar={avatar}
          setCurrentUser={setCurrentUser}
          handleName={handleName}
          setHost={setHost}
          checkedIn = {checkedIn}
        />
      )}
      
      {mode === LOBBY && (
        <Lobby
          url={full_url}
          url_path={url_path}
          handleStart={handleStart}
          currentUser={Number(currentUserCookies.user)}
          gameData={gameData}
          setGameData={setGameData}
          checkedIn = {checkedIn}
        />)}

      {mode === "GAME" && <Game
        gameData={gameData}
        currentUser={Number(currentUserCookies.user)}
        url_path={url_path}
      />}

    </div>
  );
}