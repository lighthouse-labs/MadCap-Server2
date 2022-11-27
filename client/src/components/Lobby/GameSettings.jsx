import { Fragment } from "react";
import Box from '@mui/material/Box';

import OptionsBox from "./OptionsBox";
import CategoriesBox from "./CategoriesBox";

export default function GameSettings(props) {

  return (
    <Fragment>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        pl: '10px'
      }}>
        <CategoriesBox cats={props.cats}/>
        <OptionsBox />
      </Box>
    </Fragment>
  );
}