import { useState, useEffect } from "react";
import Box from "@mui/material/Box";


export default function Round(props) {
  // const [round, setRound] = useState(1);
  const [roundTimer, setRoundTimer] = useState(4);

  // console.log("props.round in Round ~~~~~~~~~: ", props.round);

  useEffect(() => {
    const timer =
      roundTimer > 0 && setTimeout(() => setRoundTimer((prev) => prev - 1), 1000);
    if (roundTimer === 0) {
      props.getNextSubcategory();
      props.clearBoard();
      props.setStatePhase("game");
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
