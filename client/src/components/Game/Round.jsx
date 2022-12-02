import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


export default function Round (props) {
  const [gameTimer, setGameTimer] = useState(94);

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    const timer =
      gameTimer > 0 && setTimeout(() => setGameTimer(prev => (prev - 1)), 1000);
    if (gameTimer === 0) props.setStatePhase("game");
    return () => clearTimeout(timer);
  }, [gameTimer]);

  return (
    <Box className="round-box">
      <h1>Round</h1>
      <h1>#/#!</h1>
    </Box>
  )
}