// import { Fragment } from "react";
import Box from '@mui/material/Box';

import TimerSlider from "./TimerSlider";

export default function OptionsBox() {
  return (
    <div className="options-box">
      <Box>
        <TimerSlider />
      </Box>
    </div>
  );
}