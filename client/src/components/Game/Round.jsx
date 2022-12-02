import { useState, useEffect } from "react";
import Box from "@mui/material/Box";


export default function Round (props) {
  // const [round, setRound] = useState(1);
  const [roundTimer, setRoundTimer] = useState(4);
  
  useEffect(() => {
    const timer =
      roundTimer > 0 && setTimeout(() => setRoundTimer((prev) => prev - 1), 1000);
      if (roundTimer === 0) {
      props.clearBoard();
      props.setStatePhase("game");
      props.nextRound();
    }
    return () => clearTimeout(timer);
  }, [roundTimer]);

  return (
    <Box className="round-box">
      <h1>Round</h1>
      <h1>{props.round}/{props.gameData.rounds}</h1>
    </Box>
  );
}
