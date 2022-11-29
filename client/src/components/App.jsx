// import { useState } from 'react';
// import Welcome from "./Welcome";
// import Lobby from "./Lobby";
import Game from "./Game"
// import useVisualMode from "../hooks/useVisualMode";

import './App.css';
// import axios from 'axios';

export default function App() {
  // const WELCOME = "WELCOME";
  // const LOBBY = "LOBBY";
  // const GAME = "GAME";
  // const { mode, transition } = useVisualMode(WELCOME);
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
  //   .then(() => transition(LOBBY))
  //   .catch(err => console.log(err));
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
      )}
      {mode === LOBBY && (<Lobby name={name}/>)} */}
      <Game />
    </div>
  );
}