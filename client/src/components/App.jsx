import React from "react";

import './App.css';

// import Welcome from "./Welcome/Welcome";
import Lobby from "./Lobby/Lobby";

function App() {
  return (
    <div className="App">
      {/* Welcome is default */}
      {/* <Welcome /> */}
      <Lobby />
    </div>
  );
}

export default App;