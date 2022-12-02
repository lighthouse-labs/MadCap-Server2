import Box from '@mui/material/Box';

import OptionsBox from "./OptionsBox";
import CategoriesBox from "./CategoriesBox";
import LinkBox from "./LinkBox";
import StartButton from './StartButton';
import { useState } from 'react';
import axios from 'axios';

export default function GameSettings(props) {

  const [settings, setSettings] = useState(
    {
      timer: 60,
      maxPlayers: 5,
      rounds: 3
    }
    );
    
    console.log("settings in Game ~~~~~~~~~~: ", settings)
    // const playerCount = num;
    // const waitToStart = () => {
    //   // if "waiting..."
    // }

  const [currentCategories, setCurrentCategories] = useState([])

  const gamesPutRequest =  axios.put(`api/games/${props.url_path}`, {
    settings,
    categories: currentCategories
  });

  const handleSet = () => {
    gamesPutRequest
    .catch((error) => console.error(error.message))
  }

  const handleGameStart = () => {
   gamesPutRequest
    .then(() => props.handleStart())
    .catch((error) => console.error(error.message))
  }
  const buttonText = "Start the Game"

  return (
    <div className="game-settings-main">
      <Box className="cat-option-box"
        sx={{
          backgroundColor: '#f0f5ff',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'fit-content',
          ml: '6px', pl: '2px', pb: '20px'
        }}>
        <div className="settings-header">
          <h2>Game Settings</h2>
        </div>
        <CategoriesBox categories={props.categories} currentCategories={currentCategories} setCurrentCategories={setCurrentCategories}/>
        <OptionsBox settings={settings} setSettings={setSettings} handleSet={handleSet}/>
      </Box>
      <Box
        sx={{
          backgroundColor: '#f0f5ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: 'fit-content',
          mt: '30px', ml: '6px', pb: '10px'
        }}>
        <LinkBox url={props.url}/>

        <StartButton handleStart={handleGameStart}
          message={buttonText}
        />
      </Box>
    </div>
  );
}