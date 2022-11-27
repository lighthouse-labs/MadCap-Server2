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
  console.log("~~~~~~ in Lobby get", cats);

  return (
    <div className="lobby-main">
      <Box sx={{
        display: "flex",
        justifyContent: "space-around",
        minWidth: 406,
        maxWidth: 750,
        width: '70%'
      }}>
        <h2 className="lobby-header">Lobby</h2>
      </Box>
      <Box sx={{
        my: 1,
        px: 2,
        display: "flex",
        justifyContent: "space-around",
        minWidth: 406,
        maxWidth: 750,
        height: 340,
        width: '70%'
      }}>
        <PlayersList />
        <GameSettings cats={cats} />
      </Box>
    </div>
  );
};