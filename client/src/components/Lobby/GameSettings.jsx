import Box from '@mui/material/Box';

import OptionsBox from "./OptionsBox";
import CategoriesBox from "./CategoriesBox";
import LinkBox from "./LinkBox";
import StartButton from './StartButton';

export default function GameSettings(props) {

  // const playerCount = num;
  // const waitToStart = () => {
  //   // if "waiting..."
  // }

  return (
    <div className="game-settings-main">
      <Box
        sx={{
          backgroundColor: '#f0f5ff',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'fit-content',
          ml: '6px',
          pl: '2px',
          pb: '3px'
        }}>
        <div className="settings-header">
          <h2>Game Settings</h2>
        </div>
        <CategoriesBox categories={props.categories} />
        <OptionsBox />
      </Box>
      <Box
        sx={{
          backgroundColor: '#f0f5ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '10px',
          ml: '6px',
          width: '100%',
          height: 'fit-content',
          pb: '10px'
        }}>
        <LinkBox />
        <StartButton />
      </Box>
    </div>
  );
}