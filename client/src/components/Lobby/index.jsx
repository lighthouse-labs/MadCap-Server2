import { useState, useEffect } from 'react';
import axios from 'axios';

import { Box } from '@mui/material';
import GameSettings from './GameSettings';
import PlayersList from './PlayersList';

import './styles.css';

export default function Lobby(props) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios.get("/api/categories")
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="lobby-main">
      <Box sx={{
        px: 2.5,
        display: "flex",
        // minWidth: 500,
        // maxWidth: 600,
        minWidth: 447,
        maxWidth: 610,
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
        minWidth: 447,
        maxWidth: 610,
        height: 340,
        width: '70%'
      }}>
        <PlayersList name={props.name}/>
        <GameSettings categories={categories} />
      </Box>
    </div>
  );
};