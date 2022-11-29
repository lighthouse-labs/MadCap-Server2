// import { useState } from 'react';
// import axios from 'axios';

// import Welcome from "./Welcome";
// import Lobby from "./Lobby";
import Game from "./Game";
// import useVisualMode from "../hooks/useVisualMode";

import './App.css';

export default function App() {
  // const WELCOME = "WELCOME";
  // const LOBBY = "LOBBY";
  // const GAME = "GAME";
                                //change to WELCOME
  // const { mode, transition } = useVisualMode(GAME);
  // const [name, setName] = useState("");

  // const [avatar, setAvatar] = useState(null);
  // const handleAvatar = (e) => {
  //   setAvatar(e.target.value);
  // };


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

  return (
    <div className="App">
      {/* Welcome is default */}
      {/* {mode === WELCOME && (
        <Welcome
          name={name}
          // avatar={avatar}
          handleName={handleName}
          handleJoin={handleJoin}
        />
      )} */}
      {/* {mode === LOBBY && (
        <Lobby
          name={name} handleStart={handleStart}
        />
      )} */}
      {/* mode === GAME && */}
      { (<Game />)}
    </div>
  );
}