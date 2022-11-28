import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import GameSettings from './GameSettings';
import PlayersList from './PlayersList';

import './styles.css';

export default function Lobby(props) {

  const [cats, setCats] = useState(null);
  useEffect(() => {
    axios.get("/api/categories")
      .then(res => {
        setCats(res.data.categories);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  //first request is always null, fix .get() above? 
  console.log("~~~~~~ in Lobby/index: .get()", cats);

  return (
    <div className="lobby-main">
      <Box sx={{
        px: 2,
        display: "flex",
        minWidth: 485,
        maxWidth: 600,
        width: '70%'
      }}>
        <div className="lobby-header">
          <h1>Lobby</h1>
        </div>
      </Box>
      <Box sx={{
        my: 1,
        px: 1,
        display: "flex",
        justifyContent: "space-between",
        minWidth: 485,
        maxWidth: 600,
        height: 340,
        width: '70%'
      }}>
        <PlayersList />
        <GameSettings cats={cats} />
      </Box>
    </div>
  );
};