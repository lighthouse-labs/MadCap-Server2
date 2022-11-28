import { Fragment } from "react";
import Box from '@mui/material/Box';
import PlayersSlider from './PlayersSlider';
import TimerSlider from "./TimerSlider";
import RoundsSlider from './RoundsSlider'

export default function OptionsBox() {
  return (
    <Fragment>
      <Box>
        <TimerSlider />
        <PlayersSlider />
        <RoundsSlider />
      </Box>
    </Fragment>
  );
}