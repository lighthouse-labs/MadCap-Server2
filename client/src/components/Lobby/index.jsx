import { useState, useEffect } from 'react';
import axios from 'axios';

import { Box } from '@mui/material';
import GameSettings from './GameSettings';
import PlayersList from './PlayersList';

import './styles.css';

export default function Lobby(props) {


  const [categories, setCategories] = useState(null);
  const players = props.gameData.users;
  useEffect(() => {
    Promise.all([
      axios.get("/api/categories"),
      axios.get(`/api/games/${props.url_path}`)
    ])
    .then(([categoriesResponse, gameResponse]) => {
      setCategories(categoriesResponse.data);
      props.setGameData(gameResponse.data);
    })
    .catch(err => {
      console.error(err.message);
    });
  }, []);

  return (
    <div className="lobby-main">
      <Box
        sx={{
          px: 2.5,
          display: "flex",
          maxWidth: 435,
          width: '100%'
        }}>
        <div className="lobby-header">
          <h1>Lobby</h1>
        </div>
      </Box>
      <Box
        sx={{
          my: 1,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 435,
          height: 'fit-content',
          width: '100%'
        }}>
        <PlayersList
          name={props.name}
          players={players}
          setGameData={props.setGameData}
        />
        <GameSettings
          categories={categories}
          handleStart={props.handleStart}
          url={props.url}
        />
      </Box>
    </div>
  );
};