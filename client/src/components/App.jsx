import Welcome from "./Welcome";
import Lobby from "./Lobby";

import useVisualMode from "../hooks/useVisualMode";

import './App.css';

export default function App() {
  const WELCOME = "WELCOME";
  const LOBBY = "LOBBY";
  // const GAME = "GAME";
  const { mode, transition } = useVisualMode(WELCOME);


  return (
    <div className="App">
      {/* Welcome is default */}
      {mode === WELCOME && (
        <Welcome onClick={() => transition(LOBBY)} 
        />
      )}
      {mode === LOBBY && ( <Lobby /> )}
    </div>
  );
}