// import { Fragment } from "react";
import Box from '@mui/material/Box';
import PlayersSlider from './PlayersSlider';

import TimerSlider from "./TimerSlider";

export default function OptionsBox() {
  return (
    <div className="options-box">
      <Box>
        <TimerSlider />
        <PlayersSlider />
      </Box>
    </div>
  );
}