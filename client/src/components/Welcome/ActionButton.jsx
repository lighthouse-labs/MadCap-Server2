// import classNames from "classnames";
import { Fragment } from 'react';
import Button from '@mui/material/Button';


export default function ActionButton(props) {

  return (
    <Fragment>
      <Button variant="contained" color="success" size="large"
        sx={{
          width: 380,
          height: 100,
          fontSize: 30,
          mb: 1
        }}
      >{props.message}</Button>
    </Fragment>
  );
}