import { useState } from 'react';
import Welcome from "./Welcome";
import Lobby from "./Lobby";

import useVisualMode from "../hooks/useVisualMode";

import './App.css';

export default function App() {

  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  // const GAME = "GAME";
  const { mode, transition } = useVisualMode(WELCOME);

  // const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      {/* Welcome is default */}
      {mode === WELCOME && (
        <Welcome
          name={name}
          handleName={handleName}
          onClick={() => transition(LOBBY)}
        />
      )}
      {mode === LOBBY && (<Lobby name={name} />)}
    </div>
  );
}